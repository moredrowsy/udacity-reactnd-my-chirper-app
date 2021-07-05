import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddTweet } from '../store/actions/tweets.action';

function NewTweet(props) {
  const { dispatch, replyId } = props;
  const [text, setText] = useState('');
  const [toHome, setToHome] = useState(false);
  const tweetLeft = 280 - text.length;

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const onDispatchSuccess = () => {
      setText('');
      setToHome(replyId ? false : true);
    };
    dispatch(handleAddTweet(text, replyId, onDispatchSuccess));
  };

  if (toHome) {
    return <Redirect to='/' />;
  } else {
    return (
      <div>
        <h3 className='center'>Compose New Tweet</h3>
        <form className='new-tweet' onSubmit={handleSubmit}>
          <textarea
            placeholder="What's happening?"
            value={text}
            onChange={handleChange}
            className='textarea'
            maxLength={280}
          />
          {tweetLeft <= 100 && <div className='tweet-length'>{tweetLeft}</div>}
          <button className='btn' type='submit' disabled={text === ''}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(NewTweet);
