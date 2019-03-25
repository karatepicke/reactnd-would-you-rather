import { _saveQuestionAnswer } from "../../data/_DATA";
import { handleAddAnswerToUser } from "./user";


export const GET_SINGLE_QUESTION = 'GET_SINGLE_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function getSingleQuestion(question) {
  return {
    type: GET_SINGLE_QUESTION,
    question
  }
}

export function saveQuestionAnswer(question) {
  return {
    type: SAVE_QUESTION_ANSWER,
    question
  }
}

function answerQuestion(authedUser, qid, answer) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer
  }
}

export function handleQuestionAnswer(authedUser, qid, answer) {
  return (dispatch) => {
    return _saveQuestionAnswer({
      authedUser,
      qid,
      answer
    })
      .then(({ authedUser, qid, answer }) => {
        dispatch(answerQuestion(authedUser, qid, answer))
        dispatch(handleAddAnswerToUser(authedUser, qid, answer))
      })
  }
}