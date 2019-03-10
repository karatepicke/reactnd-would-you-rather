import React from 'react';
import WYRNavbar from '../components/Navigation';

class QuestionsPage extends React.Component {
  render() {
    return(
      <div className="login">
        <WYRNavbar active="questions" />
        QUESTIONS
      </div> 
    )
  }
}

export default QuestionsPage;