import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './store/reducers/rootReducer';
import { Route } from 'react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import QuestionsPage from './pages/QuestionsPage';
import AnswersPage from './pages/AnswersPage';
import LeaderboardPage from './pages/LeaderboardPage';

// Styles
import './index.css';
import './App.css';

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/questions" component={QuestionsPage} />
        <Route path="/answers" component={AnswersPage} />
        <Route path="/leaderboard" component={LeaderboardPage} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
