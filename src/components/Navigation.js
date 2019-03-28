import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

// Custom components
import LoginLogout from './LoginLogout';
import ImpersonationBadge from './ImpersonationBadge';

export default class WYRNavbar extends React.Component {
  render() {
    return (
      <div>
        <Menu pointing secondary>
          <NavLink
            exact={true}
            to="/"
            className="item"
            name='home'
            activeClassName="active"
          >Home</NavLink>
          <NavLink to="/add"
            className="item"
            name='questions'
            activeClassName="active"
          >Add Question</NavLink>
          <NavLink to="/leaderboard"
            className="item"
            name='leaderboard'
            activeClassName="active"
          >Leaderboard</NavLink>
          <Menu.Menu position='right'>
            <ImpersonationBadge />
            <LoginLogout />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}