import React from 'react';
import WYRNavbar from '../components/Navigation';

class LeaderboardPage extends React.Component {
  render() {
    return(
      <div className="leaderboard">
        <WYRNavbar active="leaderboard" />
        LEADERBOARD
      </div>
    )
  }
}

export default LeaderboardPage;