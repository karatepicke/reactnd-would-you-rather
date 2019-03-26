import {
  SET_AUTHED_USER,
  DESTROY_AUTHED_USER,
  GET_UNANSWERED_QUESTIONS_FOR_SIGNED_IN_USER,
  GET_ANSWERED_QUESTIONS_FOR_SIGNED_IN_USER,
  ADD_ANSWER_TO_USER
} from '../actions/user';

const initialState = {
  user: undefined,
  unansweredQuestions: [],
  answeredQuestions: []
}

export default function user(state = initialState, action) {
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
    case GET_UNANSWERED_QUESTIONS_FOR_SIGNED_IN_USER:
      return {
        ...state,
        unansweredQuestions: action.payload.questions
      }
    case GET_ANSWERED_QUESTIONS_FOR_SIGNED_IN_USER:
      return {
        ...state,
        answeredQuestions: action.payload.questions
      }
    case ADD_ANSWER_TO_USER:
      return {
        ...state,
        user: {
          ...state.user,
          answers: {
            ...state.user.answers,
            [action.payload.qid]: action.payload.answer
          }
        }
      }
    default:
      return state
  }
}
