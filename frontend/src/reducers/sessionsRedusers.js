import {
  SESSION_CREATE_REQUEST,
  SESSION_CREATE_RESET,
  SESSION_CREATE_SUCCESS,
  SESSION_CREATE_FAIL,
  SESSION_DETAILS_FAIL,
  SESSION_DETAILS_REQUEST,
  SESSION_DETAILS_SUCCESS,
  SESSION_LIST_FAIL,
  SESSION_LIST_REQUEST,
  SESSION_LIST_SUCCESS,
  SESSION_UPDATE_FAIL,
  SESSION_UPDATE_REQUEST,
  SESSION_UPDATE_RESET,
  SESSION_UPDATE_SUCCESS,
  SESSION_DELETE_REQUEST,
  SESSION_DELETE_SUCCESS,
  SESSION_DELETE_FAIL,
} from '../constants/sessionConstants';

export const sessionListReducer = (state = { sessions: [] }, action) => {
  switch (action.type) {
    case SESSION_LIST_REQUEST:
      return { loading: true, sessions: [] };
    case SESSION_LIST_SUCCESS:
      return { loading: false, sessions: action.payload };
    case SESSION_LIST_FAIL:
      return { loading: false, error: action.payload, sessions: [] };
    default:
      return state;
  }
};

export const sessionDetailsReducer = (
  state = { session: { registeredUsers: [] } },
  action
) => {
  switch (action.type) {
    case SESSION_DETAILS_REQUEST:
      return { loading: true, ...state };
    case SESSION_DETAILS_SUCCESS:
      return { loading: false, session: action.payload };
    case SESSION_DETAILS_FAIL:
      return { loading: false, error: action.payload, session: {} };
    default:
      return state;
  }
};

export const sessionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SESSION_CREATE_REQUEST:
      return { loading: true };
    case SESSION_CREATE_SUCCESS:
      return { loading: false, success: true, session: action.payload };
    case SESSION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SESSION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const sessionUpdateReducer = (state = { session: {} }, action) => {
  switch (action.type) {
    case SESSION_UPDATE_REQUEST:
      return { loading: true };
    case SESSION_UPDATE_SUCCESS:
      return { loading: false, success: true, session: action.payload };
    case SESSION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SESSION_UPDATE_RESET:
      return { session: {} };
    default:
      return state;
  }
};

export const sessionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SESSION_DELETE_REQUEST:
      return { loading: true };
    case SESSION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SESSION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
