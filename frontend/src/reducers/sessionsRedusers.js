import {
  SESSION_DETAILS_FAIL,
  SESSION_DETAILS_REQUEST,
  SESSION_DETAILS_SUCCESS,
  SESSION_LIST_FAIL,
  SESSION_LIST_REQUEST,
  SESSION_LIST_SUCCESS,
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
