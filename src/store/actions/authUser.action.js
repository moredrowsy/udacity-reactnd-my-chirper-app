// ACTIONS
export const SET_AUTH_USER = 'SET_AUTH_USER';

// ACTION CREATORS
export function setAuthUser(id) {
  return {
    type: SET_AUTH_USER,
    id,
  };
}
