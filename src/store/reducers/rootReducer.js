import { combineReducers } from 'redux';
import user from './user';
import questions from './questions';

export const rootReducer = combineReducers({
  user,
  questions,
});
