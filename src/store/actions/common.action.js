import { getInitialData } from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';
import { receiveTweets } from './tweets.action';
import { receiveUsers } from './users.action';
import { setAuthUser } from './authUser.action';

// TODO: Change hardcoded user id to user login later
const AUTH_USER_ID = 'tylermcginnis';

// ASYNC ACTION CREATORS
export const handleFetchData = () => async (dispatch) => {
  try {
    dispatch(showLoading());
    const { tweets, users } = await getInitialData();
    dispatch(receiveUsers(users)); // Dispatch receiveUsers first
    dispatch(receiveTweets(tweets));
    dispatch(setAuthUser(AUTH_USER_ID));
    dispatch(hideLoading());
  } catch (e) {
    console.log('Fail API.getInitialData()', e);
  }
};
