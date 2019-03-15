import React from 'react';
import { Container } from 'semantic-ui-react';

import WYRNavbar from '../components/Navigation';
import HomeGreeting from '../components/HomeGreeting';

class HomePage extends React.Component {
  render() {
    return (
      <div className="home">
        <WYRNavbar active="home" />
        <section className="intro-teaser">
          <Container className="my-container">
            <HomeGreeting />
          </Container>
        </section>
      </div>
    )
  }
}

export default HomePage;