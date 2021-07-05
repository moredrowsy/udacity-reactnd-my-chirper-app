import {
  ADD_TWEET,
  RECEIVE_TWEETS,
  TOGGLE_TWEET,
} from '../actions/tweets.action';

const initialState = {};

export default function tweets(state = initialState, action) {
  switch (action.type) {
    case ADD_TWEET:
      const { tweet } = action;
      let replyingTo = {};

      if (tweet.replyingTo) {
        replyingTo = {
          [tweet.replyingTo]: {
            ...state[tweet.replyingTo],
            replies: [...state[tweet.replyingTo].replies, tweet.id],
          },
        };
      }

      return { ...state, [tweet.id]: tweet, ...replyingTo };
    case TOGGLE_TWEET:
      const { authUser, hasLiked, id } = action;
      return {
        ...state,
        [id]: {
          ...state[id],
          likes: hasLiked
            ? state[id].likes.filter((uid) => uid !== authUser)
            : [...state[id].likes, authUser],
        },
      };
    case RECEIVE_TWEETS:
      return { ...state, ...action.tweets };
    default:
      return state;
  }
}
