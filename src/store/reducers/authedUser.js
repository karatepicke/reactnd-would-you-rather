import { SET_AUTHED_USER } from '../actions/authedUser';

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
    default:
      return state
  }
}
