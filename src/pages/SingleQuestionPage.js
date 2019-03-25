import React from 'react';
import { connect } from 'react-redux';

// API
import { _getQuestions } from '../data/_DATA';

// UI
import { Container } from 'semantic-ui-react';

// custom Components
import WYRNavbar from '../components/Navigation';
import QuestionForm from '../components/Question/QuestionForm';
import { getSingleQuestion } from '../store/actions/questions';


class SingleQuestionPage extends React.Component {
  componentWillMount() {
    const questionId = this.props.match.params.id

    if (!this.props.user) {
      this.props.history.push('/login')
      return
    }
    _getQuestions().then((questions) => {
      const currentQuestion = questions[questionId]
      if (currentQuestion) {
        this.props.dispatch(getSingleQuestion(currentQuestion))
      }
    })
  }

  render() {
    // const question = this.getSingleQuestion.map((unsansweredQuestion) => {
    return (
      <div className="question">
        <WYRNavbar active="home" />
        <Container >
          <QuestionForm currentQuestion={this.props.currentQuestion} />
        </Container>
      </div >
    )
  }
}

const mapStateToProps = ({ user, questions }) => ({
  user: user.user,
  currentQuestion: questions.currentQuestion
})
export default connect(mapStateToProps)(SingleQuestionPage);