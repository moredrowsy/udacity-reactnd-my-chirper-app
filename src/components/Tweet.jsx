import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { formatTweet, formatDate } from '../utils/helpers';
import {
  TiArrowBackOutline,
  TiHeartOutline,
  TiHeartFullOutline,
} from 'react-icons/ti';
import { handleToggleTweet } from '../store/actions/tweets.action';

function Tweet(props) {
  const { authUser, dispatch, history, tweet } = props;
  const {
    avatar,
    hasLiked,
    id,
    likes,
    name,
    parent,
    replies,
    text,
    timestamp,
  } = tweet;

  const toParent = (e, parentId) => {
    e.preventDefault();
    history.push(`/tweet/${parentId}`);
  };

  const handleLike = (e) => {
    e.preventDefault();
    dispatch(handleToggleTweet({ id, authUser, hasLiked }));
  };

  if (!tweet) return <div className='tweet'>Tweet does not exist</div>;
  else
    return (
      <Link to={`/tweet/${id}`} className='tweet'>
        <img src={avatar} alt={`Avatar of ${name}`} className='avatar' />
        <div className='tweet-info'>
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button
                className='replying-to'
                onClick={(e) => toParent(e, parent.id)}
              >
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
          <div className='tweet-icons'>
            <TiArrowBackOutline className='tweet-icon' />
            <span>{replies !== 0 && replies}</span>
            <button className='heart-button' onClick={handleLike}>
              {hasLiked ? (
                <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
              ) : (
                <TiHeartOutline className='tweet-icon' />
              )}
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </Link>
    );
}

const mapStateToProps = ({ authUser, tweets, users }, { id }) => {
  const tweet = tweets[id];
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null;

  return {
    authUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authUser, parentTweet)
      : null,
  };
};

export default withRouter(connect(mapStateToProps)(Tweet));
