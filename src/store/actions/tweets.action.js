import { saveTweet, saveLikeToggle } from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

// ACTIONS
export const ADD_TWEET = 'ADD_TWEET';
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';

// ACTION CREATORS
export function addTweet(tweet) {
  return {
    type: ADD_TWEET,
    tweet,
  };
}

export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets: tweets,
  };
}

export function toggleTweet({ id, authUser, hasLiked }) {
  return {
    type: TOGGLE_TWEET,
    id,
    authUser,
    hasLiked,
  };
}

// ASYNC ACTION CREATORS
export const handleAddTweet =
  (text, replyingTo, callback) => (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(showLoading());

    saveTweet({
      text,
      author: authUser,
      replyingTo,
    })
      .then((tweet) => dispatch(addTweet(tweet)))
      .then(() => {
        dispatch(hideLoading());
        callback();
      })
      .catch((e) => {
        console.log('Fail handleAddTweet()', e);
        dispatch(hideLoading());
        alert('Error adding tweet. Try again.');
      });
  };

export const handleToggleTweet = (info) => (dispatch) => {
  dispatch(toggleTweet(info));

  saveLikeToggle(info).catch((e) => {
    console.warn('Fail saveLikeToggle()', e);
    dispatch(toggleTweet(info));
    alert('Error liking tweet. Try again.');
  });
};
