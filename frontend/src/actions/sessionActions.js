import axios from 'axios';
import {
  SESSION_DETAILS_FAIL,
  SESSION_DETAILS_REQUEST,
  SESSION_DETAILS_SUCCESS,
  SESSION_LIST_FAIL,
  SESSION_LIST_REQUEST,
  SESSION_LIST_SUCCESS,
} from '../constants/sessionConstants';

export const listSessions = () => async (dispatch) => {
  try {
    dispatch({ type: SESSION_LIST_REQUEST });

    const { data } = await axios.get('/api/sessions');

    dispatch({ type: SESSION_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: SESSION_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listSessionDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SESSION_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/sessions/${id}`);

    dispatch({ type: SESSION_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: SESSION_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
