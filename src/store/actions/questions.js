import { _saveQuestion } from "../../data/_DATA";
import { handleAddQuestionToUser } from "./user";

export const GET_SINGLE_QUESTION = 'GET_SINGLE_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

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

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion(optionOneText, optionTwoText, author) {
  return (dispatch) => {

    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author
    })
      .then((question) => {
        dispatch(addQuestion(question))
        dispatch(handleAddQuestionToUser(question))
      })
  }
}