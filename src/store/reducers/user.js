import { SET_AUTHED_USER, DESTROY_AUTHED_USER } from '../actions/user';

const initialState = {
  user: undefined
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
    default:
      return state
  }
}


// import {
//   RECEIVE_USERS,
//   ADD_QUESTION_TO_USER,
//   ADD_ANSWER_TO_USER
// } from '../actions/users';

// export default function users(state = {}, action) {
//   switch (action.type) {
//     case RECEIVE_USERS:
//       return {
//         ...state,
//         ...action.users
//       }
//     case ADD_QUESTION_TO_USER:
//       return {
//         ...state,
//         [action.question.author]: {
//           ...state[action.question.author],
//           questions: state[action.question.author].questions.concat([action.question.id])
//         }
//       }
//     case ADD_ANSWER_TO_USER:
//       return {
//         ...state,
//         [action.user]: {
//           ...state[action.user],
//           answers: {
//             ...state[action.user].answers,
//             [action.qid]: action.answer
//           }
//         }
//       }

//     default:
//       return state
//   }
// }
