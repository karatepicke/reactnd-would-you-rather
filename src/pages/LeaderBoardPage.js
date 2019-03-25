import React from 'react';
import { connect } from 'react-redux';

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
        
      </div>
    )
  }
}

const mapStateToProps = ({user}) => ({
  user: user.user
})
export default connect(mapStateToProps)(LeaderboardPage);