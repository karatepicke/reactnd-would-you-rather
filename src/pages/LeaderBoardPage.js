import React from 'react';
import { connect } from 'react-redux';

// UI
import { Container, Segment, Icon } from 'semantic-ui-react';

// custom components
import WYRNavbar from '../components/Navigation';

// API
import { _getUsers } from '../data/_DATA';

// Actions
import { getAllUsers } from '../store/actions/users';

class LeaderboardPage extends React.Component {
  componentWillMount() {
    if (!this.props.user) {
      this.props.history.push('/login')
      return
    }

    // this.getAllUsers();
  }

  getAllUsers() {
    _getUsers()
      .then((users) => {
        let usersWithScore = Object.values(users).map((user) => {
          const questions = user.questions && Array.isArray(user.questions) ? user.questions.length : 0
          const answers = user.answers ? Object.keys(user.answers).length : 0
          const score = questions + answers

          return { ...user, score }
        })
        usersWithScore = usersWithScore.sort((a, b) => {
          if (a.score === b.score) {
            return 0
          }

          if (a.score > b.score) {
            return -1
          }

          return 1
        })
        this.props.dispatch(getAllUsers(usersWithScore));
      })
      .catch((e) => {
        (
          console.log('error:', e)
        )
      })
  }

  leaderboardUsers() {
    const users = this.props.users

    return (Object.values(users).map((user) => {
      const questions = user.questions && Array.isArray(user.questions) ? user.questions.length : 0
      const answers = user.answers ? Object.entries(user.answers).length : 0
      const score = questions + answers

      const userWithScore = { ...user, score }

      return (
        <Segment key={userWithScore.id} className="my-segment">
          <div className="leaderboard__userdetails">
            <h3>{userWithScore.name}</h3>
            <p>Questions posted: {questions}</p>
            <p>Questions answered: {answers}</p>
            <h4>Total score: {userWithScore.score}</h4>
          </div>
          <div className="leaderboard__avatar">
            <img
              alt={userWithScore.name + "Avatar"}
              src={userWithScore.avatarURL}
            />
          </div>
        </Segment>
      )
    })
    )
  }


  render() {
    if (!this.props.user) {
      return null
    }

    return (
      <div className="leaderboard">
        <WYRNavbar active="leaderboard" />
        <section className="main">
          <Container className="my-container">
            <Segment>
              <h2>Leaderboard <Icon name="trophy"></Icon></h2>
              {this.leaderboardUsers()}
            </Segment>
          </Container>
        </section>
      </div>
    )
  }
}

const mapStateToProps = ({ user, users }) => ({
  user: user.user,
  users: users.users
})
export default connect(mapStateToProps)(LeaderboardPage);
