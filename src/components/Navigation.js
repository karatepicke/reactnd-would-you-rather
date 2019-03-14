import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

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
          <NavLink to="/questions"
            className="item"
            name='questions'
            activeClassName="active"
          >Questions</NavLink>
          <NavLink to="/answers"
            className="item"
            name='answers'
            activeClassName="active"
          >Answers</NavLink>
          <NavLink to="/leaderboard"
            className="item"
            name='leaderboard'
            activeClassName="active"
          >Leaderboard</NavLink>
          <Menu.Menu position='right'>
            <NavLink
              to="/login"
              className="item"
              onClick={this.handleItemClick}
              name='login'
              activeClassName="active"
            >Login</NavLink>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}