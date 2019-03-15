export const GET_SINGLE_QUESTION = 'GET_SINGLE_QUESTION'

export function getSingleQuestion(question) {
  return {
    type: GET_SINGLE_QUESTION,
    question
  }
}
