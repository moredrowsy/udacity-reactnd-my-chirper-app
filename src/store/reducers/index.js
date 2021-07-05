import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import authUser from './authUser.reducer';
import tweets from './tweets.reducer';
import users from './users.reducer';

export default combineReducers({
  authUser,
  tweets,
  users,
  loadingBar: loadingBarReducer,
});
