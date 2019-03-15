import React from 'react';
import { Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { _getQuestions } from '../data/_DATA';
import { getUnansweredQuestionsForSignedInUser } from '../store/actions/user';

class QuestionsPanel extends React.Component {
  componentWillMount() {
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

  render() {
    if (!this.props.user) {
      return null
    }

    const unansweredQuestions = this.props.unansweredQuestions.map((unsansweredQuestion) => {
      return (
        <div className="panel--question">
          <h2>Would you rather?</h2>
          <p>{unsansweredQuestion.optionOne.text}</p>
          <p>{unsansweredQuestion.optionTwo.text}</p>
        </div>
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
