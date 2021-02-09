import axios from 'axios';
import {
  SCHEDUELE_DETAILS_FAIL,
  SCHEDUELE_DETAILS_REQUEST,
  SCHEDUELE_DETAILS_SUCCESS,
  SCHEDUELE_LIST_FAIL,
  SCHEDUELE_LIST_REQUEST,
  SCHEDUELE_LIST_SUCCESS,
  SCHEDUELE_DELETE_SUCCESS,
  SCHEDUELE_DELETE_REQUEST,
  SCHEDUELE_DELETE_FAIL,
  SCHEDUELE_CREATE_REQUEST,
  SCHEDUELE_CREATE_SUCCESS,
  SCHEDUELE_CREATE_FAIL,
  SCHEDUELE_UPDATE_REQUEST,
  SCHEDUELE_UPDATE_SUCCESS,
  SCHEDUELE_UPDATE_FAIL,
} from '../constants/schedueledConstants';
import { logout } from './userActions';

export const createScheduele = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SCHEDUELE_CREATE_REQUEST,
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

    const { data } = await axios.post(`/api/scheduele`, {}, config);

    dispatch({
      type: SCHEDUELE_CREATE_SUCCESS,
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
      type: SCHEDUELE_CREATE_FAIL,
      payload: message,
    });
  }
};

export const listSchedueles = () => async (dispatch) => {
  try {
    dispatch({ type: SCHEDUELE_LIST_REQUEST });

    const { data } = await axios.get('/api/scheduele');

    dispatch({ type: SCHEDUELE_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: SCHEDUELE_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listSchedueleDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SCHEDUELE_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/scheduele/${id}`);

    dispatch({ type: SCHEDUELE_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: SCHEDUELE_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateScheduele = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SCHEDUELE_UPDATE_REQUEST,
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
      `/api/scheduele/${product._id}`,
      product,
      config
    );

    dispatch({
      type: SCHEDUELE_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: SCHEDUELE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: SCHEDUELE_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const deleteScheduele = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SCHEDUELE_DELETE_REQUEST,
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

    await axios.delete(`/api/scheduele/${id}`, config);

    dispatch({
      type: SCHEDUELE_DELETE_SUCCESS,
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
      type: SCHEDUELE_DELETE_FAIL,
      payload: message,
    });
  }
};
