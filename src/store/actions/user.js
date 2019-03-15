export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const DESTROY_AUTHED_USER = 'DESTROY_AUTHED_USER';

export function setuser(user) {
  return {
    type: SET_AUTHED_USER,
    user,
  }
}

export function destroyuser() {
  return {
    type: DESTROY_AUTHED_USER,
    user: undefined
  }
}

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

function addQuestionToUser(question) {
  return {
    type: ADD_QUESTION_TO_USER,
    question,
  }
}

export function handleAddQuestionToUser(info) {
  return (dispatch) => {
    dispatch(addQuestionToUser(info))
  }
}

function addAnswerToUser(user, qid, answer) {
  return {
    type: ADD_ANSWER_TO_USER,
    user,
    qid,
    answer,
  }
}

export function handleAddAnswerToUser(user, qid, answer) {
  return (dispatch) => {
    dispatch(addAnswerToUser(user, qid, answer))
  }
}
