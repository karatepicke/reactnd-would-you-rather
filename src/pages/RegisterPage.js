import React from 'react';
import WYRNavbar from '../components/Navigation';
import { Container } from 'semantic-ui-react';
import SignInUpForm from '../components/SignInUp/SignInUpForm';

class RegisterPage extends React.Component {
  render() {
    return(
      <div className="login">
        <WYRNavbar active="login" />
        <Container className="my-container">
          <SignInUpForm />
        </Container>
      </div> 
    )
  }
}

export default RegisterPage;