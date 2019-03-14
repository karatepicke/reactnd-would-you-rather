import { SET_AUTHED_USER, DESTROY_AUTHED_USER } from '../actions/authedUser';

const initialState = {
  user: undefined
}

export default function authedUser(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return {
        ...state,
        user: action.user
      }
    case DESTROY_AUTHED_USER:
    return {
      ...state,
      user: undefined
    }
    default:
      return state
  }
}
