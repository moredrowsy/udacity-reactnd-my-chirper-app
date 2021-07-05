// ACTIONS
export const RECEIVE_USERS = 'RECEIVE_USERS';

// ACTION CREATORS
export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users: users,
  };
}
