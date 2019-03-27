import { combineReducers } from 'redux';
import user from './user';
import questions from './questions';
import users from './users';

export const rootReducer = combineReducers({
  user,
  questions,
  users
});
