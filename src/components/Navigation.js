import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export default class WYRNavbar extends React.Component {
  state = { 
    activeItem: this.props.active
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu pointing secondary>
          <Link to="/">
            <Menu.Item 
              onClick={this.handleItemClick}
              name='home' 
              active={activeItem === 'home'} 
            />
          </Link>
          <Link to="/questions">
            <Menu.Item
              onClick={this.handleItemClick}
              name='questions'
              active={activeItem === 'questions'}
            />
          </Link>
          <Link to="/answers">
            <Menu.Item
              onClick={this.handleItemClick}
              name='answers'
              active={activeItem === 'answers'}
            />
          </Link>
          <Link to="/leaderboard">
            <Menu.Item
              onClick={this.handleItemClick}
              name='leaderboard'
              active={activeItem === 'leaderboard'}
            />
          </Link>
          <Menu.Menu position='right'>
            <Link to="/login"> 
              <Menu.Item
                onClick={this.handleItemClick}
                name='login'
                active={activeItem === 'login'}
              />
            </Link>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}