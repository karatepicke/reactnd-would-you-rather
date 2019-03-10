import React from 'react';
import WYRNavbar from '../components/Navigation';

class LoginPage extends React.Component {
  render() {
    return(
      <div className="login">
        <WYRNavbar active="login" />
        LOGIN
      </div> 
    )
  }
}

export default LoginPage;