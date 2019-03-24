import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// custom actions
import { getUnansweredQuestionsForSignedInUser } from '../store/actions/user';
import { getAnsweredQuestionsForSignedInUser } from '../store/actions/user';

// API
import { _getQuestions } from '../data/_DATA';

// UI
import { Tab, Divider } from 'semantic-ui-react';

class QuestionsPanel extends React.Component {
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

  getAnsweredQuestions() {
    if (this.props.user) {
      _getQuestions()
        .then((questions) => {
          const arrayQuestions = []

          for (const [key, value] of Object.entries(questions)) {
            if (Object.keys(this.props.user.answers).includes(key)) {
              arrayQuestions.push(value)
            }
          }
          this.props.dispatch(getAnsweredQuestionsForSignedInUser(arrayQuestions))
        })
        .catch(() => {
          console.log('Could not resolve')
        })
    }
  }

  answeredQuestionsHelper() {
    if (this.props.answeredQuestions) {
      this.props.answeredQuestions.map((answeredQuestion) => {
        return (
          <Link to={"questions/" + answeredQuestion.id} >
            <div className="panel--question__preview">
              <p>Asked by {answeredQuestion.author}</p>
              <Divider />
              <h3>Would you rather...</h3>
              <p>...{answeredQuestion.optionOne.text}</p>
              <p>...{answeredQuestion.optionTwo.text}</p>
            </div>
          </Link >
        )
      })
    } else {
      return (
        <p>No answered questions available.</p>
      )
    }
  }

  // Event handlers
  handleRadioChange = (e, { value }) => {
    console.log(value)
    this.setState({ value })
  }

  componentWillMount() {
    this.getUnansweredQuestions();
    this.getAnsweredQuestions();
  }

  render() {
    if (!this.props.user) {
      return null
    }
    const unansweredQuestions = this.props.unansweredQuestions.map((unansweredQuestion) => {
      return (
        <Link to={"questions/" + unansweredQuestion.id} >
          <div className="panel--question__preview">
            <p>Asked by {unansweredQuestion.author}</p>
            <Divider />
            <h3>Would you rather...</h3>
            <p>...{unansweredQuestion.optionOne.text}</p>
            <p>...{unansweredQuestion.optionTwo.text}</p>
          </div>
        </Link >
      )
    })
    const answeredQuestions = this.answeredQuestionsHelper();

    const panes = [
      { menuItem: 'Unanswered Questions', render: () => <Tab.Pane>{unansweredQuestions}</Tab.Pane> },
      { menuItem: 'Answered Questions', render: () => <Tab.Pane>{answeredQuestions}</Tab.Pane> }
    ]

    return (
      <Tab panes={panes} />
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.user,
  unansweredQuestions: user.unansweredQuestions,
  answeredQuestions: user.answeredQuestions
})
export default connect(mapStateToProps)(QuestionsPanel);
