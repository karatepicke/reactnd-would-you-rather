import React from 'react';
import { connect } from 'react-redux';

// custom Components
import WYRNavbar from '../components/Navigation';

// UI
import { Container } from 'semantic-ui-react';
import QuestionResult from '../components/Question/QuestionResult';


class ResultPage extends React.Component {
  componentWillMount() {
    const questionId = this.props.match.params.id
  }

  render() {
    return (
      <div>
        <WYRNavbar />
        <Container className="my-container">
          <QuestionResult currentQuestion={this.props.currentQuestion} history={this.props.history} />
        </Container>
      </div>
    )
  }
}

const mapStateToProps = ({ user, questions }) => ({
  user: user.user,
  currentQuestion: questions.currentQuestion
})
export default connect(mapStateToProps)(ResultPage);
