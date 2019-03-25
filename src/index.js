import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './store/reducers/rootReducer';
import { Route, Switch } from 'react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NewQuestionPage from './pages/NewQuestionPage';
import SingleQuestionPage from './pages/SingleQuestionPage';
import AnswersPage from './pages/AnswersPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ResultPage from './pages/ResultPage';

// Styles
import './index.css';
import './App.css';
import NotFound from './pages/404';

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/add" component={NewQuestionPage} />
        <Route path="/questions/:id" component={SingleQuestionPage} />
        <Route path='/results/:id' exact component={ResultPage} />
        <Route path="/answers" component={AnswersPage} />
        <Route path="/leaderboard" component={LeaderboardPage} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
