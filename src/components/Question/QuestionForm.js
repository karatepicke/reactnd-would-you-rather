import React from 'react';
import { Form, Divider } from 'semantic-ui-react';
import { getUnansweredQuestionsForSignedInUser } from '../../store/actions/user';

// API
import { _getQuestions } from '../../data/_DATA';


class QuestionForm extends React.Component {
  state = {}

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
  handleRadioChange = (e, { value }) => {
    console.log(value)
    this.setState({ value })
  }

  render() {
    const { value } = this.state
    return (
      <div className="panel--question">
        {/* <h3>Asked by {this.props.unansweredQuestion.author}:</h3> */}
        <Divider />
        <h2>Would you rather?</h2>
        <Form >
          <Form.Radio
            onChange={this.handleRadioChange.bind(this)}
            // label={this.props.unsansweredQuestion.optionOne.text}
            checked={value === 'optionOne'}
            value="optionOne"
          />
          <Form.Radio
            onChange={this.handleRadioChange.bind(this)}
            // label={this.props.unsansweredQuestion.optionTwo.text}
            checked={value === 'optionTwo'}
            value="optionTwo"
          />
          <Form.Button>Submit</Form.Button>
        </Form>
      </div >
    )
  }
}

export default QuestionForm;
