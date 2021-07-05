import { SET_AUTH_USER } from '../actions/authUser.action';

const initialState = null;

export default function authUser(state = initialState, action) {
  switch (action.type) {
    case SET_AUTH_USER:
      return action.id;
    default:
      return state;
  }
}
