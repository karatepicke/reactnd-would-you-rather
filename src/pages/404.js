import React from 'react';
// import { Link } from 'react-router-dom';

import WYRNavbar from '../components/Navigation';

class NotFound extends React.Component {
  render() {
    return (
      <div className="login">
        <WYRNavbar active="questions" />
        Content not found.
      </div>
    )
  }
}

export default NotFound;