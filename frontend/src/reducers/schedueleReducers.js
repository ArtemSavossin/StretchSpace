import {
  SCHEDUELE_CREATE_REQUEST,
  SCHEDUELE_CREATE_RESET,
  SCHEDUELE_CREATE_SUCCESS,
  SCHEDUELE_CREATE_FAIL,
  SCHEDUELE_DETAILS_FAIL,
  SCHEDUELE_DETAILS_REQUEST,
  SCHEDUELE_DETAILS_SUCCESS,
  SCHEDUELE_LIST_FAIL,
  SCHEDUELE_LIST_REQUEST,
  SCHEDUELE_LIST_SUCCESS,
  SCHEDUELE_UPDATE_FAIL,
  SCHEDUELE_UPDATE_REQUEST,
  SCHEDUELE_UPDATE_RESET,
  SCHEDUELE_UPDATE_SUCCESS,
  SCHEDUELE_DELETE_REQUEST,
  SCHEDUELE_DELETE_SUCCESS,
  SCHEDUELE_DELETE_FAIL,
} from '../constants/schedueledConstants';

export const schedueleListReducer = (state = { schedueles: [] }, action) => {
  switch (action.type) {
    case SCHEDUELE_LIST_REQUEST:
      return { loading: true, schedueles: [] };
    case SCHEDUELE_LIST_SUCCESS:
      return { loading: false, schedueles: action.payload };
    case SCHEDUELE_LIST_FAIL:
      return { loading: false, error: action.payload, schedueles: [] };
    default:
      return state;
  }
};

export const schedueleDetailsReducer = (
  state = { scheduele: { registeredUsers: [] } },
  action
) => {
  switch (action.type) {
    case SCHEDUELE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case SCHEDUELE_DETAILS_SUCCESS:
      return { loading: false, scheduele: action.payload };
    case SCHEDUELE_DETAILS_FAIL:
      return { loading: false, error: action.payload, scheduele: {} };
    default:
      return state;
  }
};

export const schedueleCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SCHEDUELE_CREATE_REQUEST:
      return { loading: true };
    case SCHEDUELE_CREATE_SUCCESS:
      return { loading: false, success: true, scheduele: action.payload };
    case SCHEDUELE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SCHEDUELE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const schedueleUpdateReducer = (state = { scheduele: {} }, action) => {
  switch (action.type) {
    case SCHEDUELE_UPDATE_REQUEST:
      return { loading: true };
    case SCHEDUELE_UPDATE_SUCCESS:
      return { loading: false, success: true, scheduele: action.payload };
    case SCHEDUELE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SCHEDUELE_UPDATE_RESET:
      return { scheduele: {} };
    default:
      return state;
  }
};

export const schedueleDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SCHEDUELE_DELETE_REQUEST:
      return { loading: true };
    case SCHEDUELE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SCHEDUELE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
