import {
  GET_SINGLE_QUESTION
} from '../actions/questions';

const initialState = {
  currentQuestion: undefined
}

export default function questions(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_QUESTION:
      return {
        ...state,
        currentQuestion: action.question
      }
    default:
      return state
  }
}
