import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { destroyAuthedUser } from '../store/actions/authedUser';

class LoginLogout extends React.Component {
  render() {
    if (!this.props.user) {
      return (
        <NavLink
          to="/login"
          className="item"
          name='login'
          activeClassName="active"
        >Login</NavLink>
      )
    }
    return (
      <NavLink
        onClick={this.handleLogoutClick.bind(this)}
        to="#"
        className="item"
        name='login'
      >Logout</NavLink>
    )
  }

  handleLogoutClick(event) {
    event.preventDefault();

    this.props.dispatch(destroyAuthedUser())
  }
}

const mapStateToProps = ({ authedUser }) => ({ user: authedUser.user })
export default connect(mapStateToProps)(LoginLogout);
