import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { destroyuser } from '../store/actions/user';

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

    this.props.dispatch(destroyuser())
  }
}

const mapStateToProps = ({ user }) => ({ user: user.user })
export default connect(mapStateToProps)(LoginLogout);
