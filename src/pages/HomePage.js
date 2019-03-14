import React from 'react';
import { Container, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import WYRNavbar from '../components/Navigation';
import HomeGreeting from '../components/HomeGreeting';

class HomePage extends React.Component {
  render() {
    return(
      <div className="home">
        <WYRNavbar active="home" />
        <section className="intro-teaser grayscale ">
          <Container className="my-container">
            <HomeGreeting />
          </Container>
        </section>
      </div> 
    )
  }
}

export default HomePage;