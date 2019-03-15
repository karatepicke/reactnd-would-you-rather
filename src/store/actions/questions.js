import { saveQuestionAnswer, saveQuestion } from '../../APIUtils/APIfunctions';
import { handleAddQuestionToUser, handleAddAnswerToUser } from './user';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion(optionOneText, optionTwoText, author) {
  return (dispatch) => {

    return saveQuestion({
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

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function answerQuestion(user, qid, answer) {
  return {
    type: ANSWER_QUESTION,
    user,
    qid,
    answer
  }
}

export function handleAnswerQuestion(user, qid, answer) {
  return (dispatch) => {
    return saveQuestionAnswer({
      qid,
      user,
      answer
    })
      .then(({ user, qid, answer }) => {
        dispatch(answerQuestion(user, qid, answer))
        dispatch(handleAddAnswerToUser(user, qid, answer))
      })
  }
}
