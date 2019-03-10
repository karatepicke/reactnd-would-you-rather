import React from 'react';
import WYRNavbar from '../components/Navigation';
import { Container } from 'semantic-ui-react';
import SignInUpPrompt from '../components/SignInUp/SignInUpPrompt';

class LoginPage extends React.Component {
  render() {
    return(
      <div className="login">
        <WYRNavbar active="login" />
        <Container className="my-container">
          <SignInUpPrompt />
        </Container>
      </div> 
    )
  }
}

export default LoginPage;