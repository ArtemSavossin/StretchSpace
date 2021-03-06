import axios from 'axios';
import {
  SESSION_DETAILS_FAIL,
  SESSION_DETAILS_REQUEST,
  SESSION_DETAILS_SUCCESS,
  SESSION_LIST_FAIL,
  SESSION_LIST_REQUEST,
  SESSION_LIST_SUCCESS,
  SESSION_DELETE_SUCCESS,
  SESSION_DELETE_REQUEST,
  SESSION_DELETE_FAIL,
  SESSION_CREATE_REQUEST,
  SESSION_CREATE_SUCCESS,
  SESSION_CREATE_FAIL,
  SESSION_UPDATE_REQUEST,
  SESSION_UPDATE_SUCCESS,
  SESSION_UPDATE_FAIL,
} from '../constants/sessionConstants';
import { logout } from './userActions';

export const createSession = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SESSION_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Accept-enconding': 'gzip, compress, br',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/sessions`, {}, config);

    dispatch({
      type: SESSION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: SESSION_CREATE_FAIL,
      payload: message,
    });
  }
};

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

export const updateSession = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SESSION_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept-enconding': 'gzip, compress, br',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/sessions/${product._id}`,
      product,
      config
    );

    dispatch({
      type: SESSION_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: SESSION_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: SESSION_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const deleteSession = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SESSION_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Accept-enconding': 'gzip, compress, br',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/sessions/${id}`, config);

    dispatch({
      type: SESSION_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: SESSION_DELETE_FAIL,
      payload: message,
    });
  }
};
