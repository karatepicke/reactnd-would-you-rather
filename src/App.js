import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import QuestionsPage from './pages/QuestionsPage';
import AnswersPage from './pages/AnswersPage';
import LeaderboardPage from './pages/LeaderboardPage';

// Styles
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={ HomePage } />
        <Route path="/login" component={ LoginPage } />
        <Route path="/register" component={ RegisterPage } />
        <Route path="/questions" component={ QuestionsPage } />
        <Route path="/answers" component={ AnswersPage } />
        <Route path="/leaderboard" component={ LeaderboardPage } />
      </div>
    );
  }
}

export default App;
