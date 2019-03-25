import React from 'react';
import { Form, Divider } from 'semantic-ui-react';
import { getUnansweredQuestionsForSignedInUser } from '../../store/actions/user';
import { connect } from 'react-redux';

// API
import { _getQuestions, _saveQuestionAnswer } from '../../data/_DATA';



class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 'optionOne'
    }
  }

  getUnansweredQuestions() {
    if (this.props.user) {
      _getQuestions()
        .then((questions) => {
          const arrayQuestions = []

          for (const [key, value] of Object.entries(questions)) {
            if (!Object.keys(this.props.user.answers).includes(key)) {
              arrayQuestions.push(value)
            }
          }
          this.props.dispatch(getUnansweredQuestionsForSignedInUser(arrayQuestions))
        })
        .catch(() => {
          console.log('Could not resolve')
        })
    }
  }

  // Event handlers
  handleRadioChange(currentTarget) {
    this.setState({
      checked: currentTarget
    })
  }

  handleFormSubmit(e) {
    e.preventDefault()
    console.log(this.props.user.id)
    _saveQuestionAnswer({ authedUser: this.props.user.id, qid: this.props.currentQuestion.id, answer: this.state.checked }).then((question) => {
      console.log(question)
    })
  }

  render() {
    if (!this.props.currentQuestion) {
      return null
    }
    return (
      <div className="panel--question">
        <Divider />
        <h2>Would you rather?</h2>
        <Form onSubmit={this.handleFormSubmit.bind(this)}>
          <div className="ui radio checkbox">
            <input
              onChange={this.handleRadioChange.bind(this, 'optionOne')}
              readOnly={true}
              tabIndex={0}
              type="radio"
              name="optionOne"
              checked={this.state.checked === 'optionOne'}
              value="optionOne" />
            <label>{this.props.currentQuestion.optionOne.text}</label>
          </div>

          <div className="ui radio checkbox">
            <input
              onChange={this.handleRadioChange.bind(this, 'optionTwo')}
              readOnly={true}
              tabIndex={0}
              type="radio"
              name="optionTwo"
              checked={this.state.checked === 'optionTwo'}
              value="optionTwo" />
            <label>{this.props.currentQuestion.optionTwo.text}</label>
          </div>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div >
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.user
})
export default connect(mapStateToProps)(QuestionForm);
