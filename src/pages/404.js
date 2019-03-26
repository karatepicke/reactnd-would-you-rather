import React from 'react';
import { Link } from 'react-router-dom';

// UI
import { Container } from 'semantic-ui-react';

import WYRNavbar from '../components/Navigation';

class NotFound extends React.Component {
  render() {
    return (
      <div className="login">
        <WYRNavbar active="questions" />
        <section className="main">
          <Container className="my-container">
            <h2>Error 404</h2>
            <p>Content not found.</p>
            <Link to="/">Return home.</Link>
          </Container>
        </section>
      </div>
    )
  }
}

export default NotFound;