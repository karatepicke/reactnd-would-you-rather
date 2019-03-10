import React from 'react';
import WYRNavbar from '../components/Navigation';

class HomePage extends React.Component {
  render() {
    return(
      <div className="home">
        <WYRNavbar active="home" />
      </div> 
    )
  }
}

export default HomePage;