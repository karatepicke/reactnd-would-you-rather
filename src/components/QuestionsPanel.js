import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUnansweredQuestionsForSignedInUser } from '../store/actions/user';

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

  // Event handlers
  handleRadioChange = (e, { value }) => {
    console.log(value)
    this.setState({ value })
  }

  componentWillMount() {
    this.getUnansweredQuestions();
  }

  render() {
    if (!this.props.user) {
      return null
    }
    const unansweredQuestions = this.props.unansweredQuestions.map((unsansweredQuestion) => {
      return (
        <Link to={"questions/" + unsansweredQuestion.id} >
          <div className="panel--question__preview">
            <p>Asked by {unsansweredQuestion.author}</p>
            <Divider />
            <h3>{unsansweredQuestion.optionOne.text}</h3>
          </div>
        </Link >
      )
    })

    const panes = [
      { menuItem: 'Unanswered Questions', render: () => <Tab.Pane>{unansweredQuestions}</Tab.Pane> },
      { menuItem: 'Answered Questions', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> }
    ]

    return (
      <Tab panes={panes} />
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.user,
  unansweredQuestions: user.unansweredQuestions
})
export default connect(mapStateToProps)(QuestionsPanel);
