export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const DESTROY_AUTHED_USER = 'DESTROY_AUTHED_USER';

export function setAuthedUser(user) {
  return {
    type: SET_AUTHED_USER,
    user,
  }
}

export function destroyAuthedUser() {
  return {
    type: DESTROY_AUTHED_USER,
    user: undefined
  }
}