import React from 'react';
import { connect } from 'react-redux';

// UI
import { Container } from 'semantic-ui-react';

// custom components
import WYRNavbar from '../components/Navigation';

class LeaderboardPage extends React.Component {
  componentWillMount() {
    if (!this.props.user) {
      this.props.history.push('/login')
      return
    }

    // this.getAuthorAvatarUrl();
  }

  render() {
    return(
      <div className="leaderboard">
        <WYRNavbar active="leaderboard" />
        <section className="main">
          <Container className="my-container">
            <h2>Leaderboard</h2>
          </Container>
        </section>
      </div>
    )
  }
}

const mapStateToProps = ({user}) => ({
  user: user.user
})
export default connect(mapStateToProps)(LeaderboardPage);