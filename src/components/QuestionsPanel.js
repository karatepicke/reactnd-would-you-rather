import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// custom actions
import { getUnansweredQuestionsForSignedInUser, getAnsweredQuestionsForSignedInUser } from '../store/actions/user';
import { getAllUsers } from '../store/actions/users';

// API
import { _getQuestions, _getUsers } from '../data/_DATA';

// UI
import { Tab, Divider, Placeholder } from 'semantic-ui-react';

class QuestionsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingAvatars: true,
      questionsAuthors: {}
    }
  }

  componentWillMount() {
    this.getAuthors();
    this.getUnansweredQuestions();
    this.getAnsweredQuestions();
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

  getAuthors() {
    _getUsers().then((users) => {
      this.props.dispatch(getAllUsers(users));
    })
      .catch(() => {
        console.log('Could not resolve')
      })
  }

  matchAuthorToUser(author) {
    return this.props.users[author]
  }

  // Event handlers
  handleRadioChange = ({ value }) => {
    this.setState({ value })
  }

  render() {
    if (!this.props.user) {
      return null
    }
    const { loadingAvatar } = this.state

    const unansweredQuestions = this.props.unansweredQuestions.map((unansweredQuestion) => {
      return (
        <Link key={unansweredQuestion.id} to={"questions/" + unansweredQuestion.id} >
          <div className="panel--question__preview question-box">
            <div className="home-asked-by-wrapper">
              <span>Asked by {this.matchAuthorToUser(unansweredQuestion.author).name}</span>
              {loadingAvatar ? (
                <Placeholder className="home-question-author__avatar--placeholder">
                  <Placeholder.Image square />
                </Placeholder>
              ) : (
                  <img
                    className="home-question-author__avatar"
                    src={this.matchAuthorToUser(unansweredQuestion.author).avatarURL}
                    alt="User-Avatar"
                  />
                )}
            </div>
            <Divider />
            <h3>Would you rather...</h3>
            <p>...{unansweredQuestion.optionOne.text}?</p>
            <p>...{unansweredQuestion.optionTwo.text}?</p>
          </div>
        </Link >
      )
    })
    const answeredQuestions = this.props.answeredQuestions.map((answeredQuestion) => {
      return (
        <Link key={answeredQuestion.id} to={"questions/" + answeredQuestion.id} >
          <div className="panel--question__preview question-box">
            <div className="home-asked-by-wrapper">
              <span>Asked by {this.matchAuthorToUser(answeredQuestion.author).name}</span>
              {loadingAvatar ? (
                <Placeholder className="home-question-author__avatar--placeholder">
                  <Placeholder.Image square />
                </Placeholder>
              ) : (
                  <img
                    className="home-question-author__avatar"
                    src={this.matchAuthorToUser(answeredQuestion.author).avatarURL}
                    alt="User-Avatar" />
                )}
            </div>
            <Divider />
            <h3>Would you rather...</h3>
            <p>...{answeredQuestion.optionOne.text}?</p>
            <p>...{answeredQuestion.optionTwo.text}?</p>
          </div>
        </Link >
      )
    })

    const panes = [
      { key: 1, menuItem: 'Unanswered Questions', render: () => <Tab.Pane>{unansweredQuestions}</Tab.Pane> },
      { key: 2, menuItem: 'Answered Questions', render: () => <Tab.Pane>{answeredQuestions}</Tab.Pane> }
    ]

    return (
      <Tab panes={panes} />
    )
  }
}

const mapStateToProps = ({ user, users }) => ({
  user: user.user,
  users: users.users,
  unansweredQuestions: user.unansweredQuestions,
  answeredQuestions: user.answeredQuestions
})
export default connect(mapStateToProps)(QuestionsPanel);
