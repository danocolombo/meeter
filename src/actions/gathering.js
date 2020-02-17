import axios from 'axios';
import { setAlert } from './alert';
import { GET_GATHERINGS, GATHERING_ERROR, GET_GATHERING, DELETE_GATHERING } from './types';

//get gatherings
export const getGatherings = () => async dispatch => {
  try {
    const res = await axios.get('/api/meeting');

    dispatch({
      type: GET_GATHERINGS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GATHERING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Create or update gathering
export const createGathering = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log("in action/gatherings");
    const res = await axios.post('/api/meeting', formData, config);

    dispatch({
      type: GET_GATHERING,
      payload: res.data
    });

    dispatch(
      setAlert(edit ? 'Gathering Updated' : 'Gathering Created', 'success')
    );

    if (!edit) {
      history.push('/meetings');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: GATHERING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Get gathering
export const getGathering = id => async dispatch => {
  try {
    const res = await axios.get(`/api/meeting/${id}`);

    dispatch({
      type: GET_GATHERING,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GATHERING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Delete GATHERING
export const deleteGathering = id => async dispatch => {
  try {
    await axios.delete(`/api/meeting/${id}`);

    dispatch({
      type: DELETE_GATHERING,
      payload: id
    });

    dispatch(setAlert('Meeting Removed', 'success'));
  } catch (err) {
    dispatch({
      type: GATHERING_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};