import { getInitialData } from '../../APIUtils/APIfunctions';
import { setAuthedUser } from './authedUser';
import { receiveUsers } from './users';
import { receiveQuestions } from './questions';

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
      })
  }
}

export function authenticate(authedId) {
  return (dispatch) => {
    dispatch(setAuthedUser(authedId))
  }
}