import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from './logger.middleware';

const middlewares = [thunk, logger];

export default applyMiddleware(...middlewares);
