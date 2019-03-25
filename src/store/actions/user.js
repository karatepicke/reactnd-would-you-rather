export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const DESTROY_AUTHED_USER = 'DESTROY_AUTHED_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER';
export const ADD_ANSWER_TO_USER = 'ADD_ANSWER_TO_USER';
export const GET_UNANSWERED_QUESTIONS_FOR_SIGNED_IN_USER = 'GET_UNANSWERED_QUESTIONS_FOR_SIGNED_IN_USER';
export const GET_ANSWERED_QUESTIONS_FOR_SIGNED_IN_USER = 'GET_ANSWERED_QUESTIONS_FOR_SIGNED_IN_USER';

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
    type: GET_UNANSWERED_QUESTIONS_FOR_SIGNED_IN_USER,
    payload: {
      questions,
    }
  }
}

export function getAnsweredQuestionsForSignedInUser(questions) {
  return {
    type: GET_ANSWERED_QUESTIONS_FOR_SIGNED_IN_USER,
    payload: {
      questions,
    }
  }
}

function addAnswerToUser(authedUser, qid, answer) {
  return {
    type: ADD_ANSWER_TO_USER,
    authedUser,
    qid,
    answer,
  }
}

export function handleAddAnswerToUser(authedUser, qid, answer) {
  return (dispatch) => {
    dispatch(addAnswerToUser(authedUser, qid, answer))
  }
}

function addQuestionToUser (question){
  return{
    type: ADD_QUESTION_TO_USER,
    question,
  }
}

export function handleAddQuestionToUser (info) {
  return (dispatch) => {
    dispatch(addQuestionToUser(info))
  }
}