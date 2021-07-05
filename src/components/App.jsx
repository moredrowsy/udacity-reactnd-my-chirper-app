import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { Route } from 'react-router-dom';
import { handleFetchData } from '../store/actions/common.action';

import DashBoard from './DashBoard';
import Nav from './Nav';
import NewTweet from './NewTweet';
import TweetPage from './TweetPage';

function App(props) {
  const { dispatch, loading } = props;

  useEffect(() => {
    dispatch(handleFetchData());
  }, [dispatch]);

  return (
    <>
      <LoadingBar />
      <div className='container'>
        <Nav />
        {!loading && (
          <>
            <Route path='/' exact>
              <DashBoard />
            </Route>
            <Route path='/new'>
              <NewTweet />
            </Route>
            <Route path='/tweet/:id'>
              <TweetPage />
            </Route>
          </>
        )}
      </div>
    </>
  );
}

const mapStateToProps = ({ authUser }) => ({
  loading: authUser === null,
});

export default connect(mapStateToProps)(App);
