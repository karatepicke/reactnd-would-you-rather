import React from 'react';
import { connect } from 'react-redux';

// UI
import { Container, Segment } from 'semantic-ui-react';

// custom components
import WYRNavbar from '../components/Navigation';

// API
import { _getUsers } from '../data/_DATA';
import { getAllUsers } from '../store/actions/users';

class LeaderboardPage extends React.Component {
  componentWillMount() {
    if (!this.props.user) {
      this.props.history.push('/login')
      return
    }

    this.getAllUsers();
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
      .catch(
        console.log('Could not resolve')
      )
  }


  render() {
    if (!this.props.user) {
      return null
    }
    const leaderboardUsers = this.props.users.map((user) => {
      return (
        <div>
          <h3>{user.name}</h3>
          <p>{user.score}</p>
        </div>
      )
    })

    return (
      <div className="leaderboard">
        <WYRNavbar active="leaderboard" />
        <section className="main">
          <Container className="my-container">
            <Segment>
              <h2>Leaderboard</h2>
              {leaderboardUsers}
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