import {
  GET_SINGLE_QUESTION
} from '../actions/questions';

export default function questions(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_QUESTION:
      return {
        ...state,
        ...action.questions
      }
    default:
      return state
  }
}
