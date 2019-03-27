import { GET_ALL_USERS } from "../actions/users";

const initialState = {
  users: []
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload.users
      }
    default: {
      return state
    }
  }
}
