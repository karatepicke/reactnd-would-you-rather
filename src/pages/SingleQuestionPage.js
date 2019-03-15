import React from 'react';
import { connect } from 'react-redux';

// API
import { _getQuestions } from '../data/_DATA';

// UI
import { Container } from 'semantic-ui-react';

// custom Components
import WYRNavbar from '../components/Navigation';
import QuestionForm from '../components/Question/QuestionForm';


class SingleQuestionPage extends React.Component {
  componentDidMount() {
    const questionId = this.props.match.params.id
    console.log(questionId)
  }

  componentWillMount() {
    if (!this.props.user) {
      this.props.history.push('/login')
    }
  }

  render() {
    // const question = this.getSingleQuestion.map((unsansweredQuestion) => {
    return (
      <div className="question">
        <WYRNavbar active="home" />
        <Container >
          <QuestionForm unansweredQuestion={this.props.unsansweredQuestion} />
        </Container>
      </div >
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.user
})
export default connect(mapStateToProps)(SingleQuestionPage);