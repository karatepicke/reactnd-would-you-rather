import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

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
        to="/login"
        className="item"
        name='login'
      >Logout</NavLink>
    )
  }
}

const mapStateToProps = ({ authedUser }) => ({ user: authedUser.user })
export default connect(mapStateToProps)(LoginLogout);
