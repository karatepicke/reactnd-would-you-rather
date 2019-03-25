import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import QuestionsPanel from './QuestionsPanel';

// UI
import { Segment, Icon, Header } from 'semantic-ui-react';

class HomeGreeting extends React.Component {
  render() {
    if (!this.props.user) {
      return (
        <Segment className="t-center">
          <h1>Would you rather...?</h1>
          <p className="subheading">A React Nanodegree Project by Dominik Pickenäcker</p>

          <h2>Welcome Guest!</h2>

          <Segment placeholder>
            <p>"Would you rather" is a game that lets you answer questions by choosing
            one of two given options. To answer or post questions you need to <Link to="/login">login</Link>.</p>
            <h3><Icon name='trophy' />Gather points and climb the leaderboard</h3>
            <p>Gather points and climb the leaderboard by answering questions and
            submitting your own ones.</p>
          </Segment>
        </Segment>
      )
    }
    return (
      <Segment className="t-center">
        <h1>Would you rather...?</h1>
        <p className="subheading">A React Nanodegree Project by Dominik Pickenäcker</p>

        <h2>Welcome, {this.props.user.name}!</h2>

        <Segment placeholder>
          <Header icon>
            <Icon name='question' />
            Here is a selection of questions for you:
          </Header>
          <QuestionsPanel />
        </Segment>
      </Segment>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user: user.user })
export default connect(mapStateToProps)(HomeGreeting);
