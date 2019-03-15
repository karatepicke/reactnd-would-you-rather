export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const DESTROY_AUTHED_USER = 'DESTROY_AUTHED_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER';
export const GET_UNSANSWERED_QUESTIONS_FOR_SIGNED_IN_USER = 'GET_UNSANSWERED_QUESTIONS_FOR_SIGNED_IN_USER'

export function setUser(user) {
  return {
    type: SET_AUTHED_USER,
    user,
  }
}

export function destroyUser() {
  return {
    type: DESTROY_AUTHED_USER,
    user: undefined
  }
}


export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function getUnansweredQuestionsForSignedInUser(questions) {
  return {
    type: GET_UNSANSWERED_QUESTIONS_FOR_SIGNED_IN_USER,
    payload: {
      questions,
    }
  }
}

// function addQuestionToUser(question) {
//   return {
//     type: ADD_QUESTION_TO_USER,
//     question,
//   }
// }

// export function handleAddQuestionToUser(info) {
//   return (dispatch) => {
//     dispatch(addQuestionToUser(info))
//   }
// }

// function addAnswerToUser(user, qid, answer) {
//   return {
//     type: ADD_ANSWER_TO_USER,
//     user,
//     qid,
//     answer,
//   }
// }

// export function handleAddAnswerToUser(user, qid, answer) {
//   return (dispatch) => {
//     dispatch(addAnswerToUser(user, qid, answer))
//   }
// }
