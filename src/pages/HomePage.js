import React from 'react';
import WYRNavbar from '../components/Navigation';
import { Container } from 'semantic-ui-react'
import SignInUpPrompt from '../components/SignInUp/SignInUpPrompt';

class HomePage extends React.Component {
  render() {
    return(
      <div className="home">
        <WYRNavbar active="home" />
        <Container className="my-container">
          <h1>Would you rather...?</h1>
          <p className="subheading">A React Nanodegree Project by Dominik Pickenäcker</p>
        </Container>
        <Container className="my-container">
          <SignInUpPrompt />
        </Container>
      </div> 
    )
  }
}

export default HomePage;