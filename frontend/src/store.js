import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  sessionListReducer,
  sessionDetailsReducer,
  sessionCreateReducer,
  sessionUpdateReducer,
  sessionDeleteReducer,
} from './reducers/sessionsRedusers';
import {
  schedueleListReducer,
  schedueleDetailsReducer,
  schedueleCreateReducer,
  schedueleUpdateReducer,
  schedueleDeleteReducer,
} from './reducers/schedueleReducers';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  listUsersReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
  schedueleList: schedueleListReducer,
  schedueleDetails: schedueleDetailsReducer,
  schedueleCreate: schedueleCreateReducer,
  schedueleUpdate: schedueleUpdateReducer,
  schedueleDelete: schedueleDeleteReducer,
  sessionList: sessionListReducer,
  sessionDetails: sessionDetailsReducer,
  sessionCreate: sessionCreateReducer,
  sessionUpdate: sessionUpdateReducer,
  sessionDelete: sessionDeleteReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  listUsers: listUsersReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem('StretchingSpaceUserInfo')
  ? JSON.parse(localStorage.getItem('StretchingSpaceUserInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
