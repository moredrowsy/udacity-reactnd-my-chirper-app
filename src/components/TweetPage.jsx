import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import NewTweet from './NewTweet';
import Tweet from './Tweet';

function TweetPage(props) {
  const { id, replies } = props;

  return (
    <div>
      <Tweet id={id} />
      <NewTweet replyId={id} />
      {replies.length !== 0 && <h3 className='center'>Replies</h3>}
      <ul>
        {replies.map((replyId) => (
          <li key={replyId}>
            <Tweet id={replyId} />
          </li>
        ))}
      </ul>
    </div>
  );
}

const mapStateToProps = ({ authUser, tweets, users }, props) => {
  const { id } = props.match.params;

  return {
    id,
    replies: !tweets[id]
      ? []
      : tweets[id].replies.sort(
          (a, b) => tweets[b].timestamp - tweets[a].timestamp
        ),
  };
};

export default withRouter(connect(mapStateToProps)(TweetPage));
