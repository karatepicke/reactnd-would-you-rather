import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// custom actions
import { getUnansweredQuestionsForSignedInUser } from '../store/actions/user';
import { getAnsweredQuestionsForSignedInUser } from '../store/actions/user';

// API
import { _getQuestions, _getUsers } from '../data/_DATA';

// UI
import { Tab, Divider, Placeholder } from 'semantic-ui-react';

class QuestionsPanel extends React.Component {
  state = {
    loadingAvatars: true,
    questionsAuthorsAvatars: []
  }

  componentWillMount() {
    // this.getAuthorAvatarUrl();
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

  // getAuthorsAvatarUrls() {
  //   console.log(this.props.unansweredQuestions)
  //   _getUsers().then((users) => {
  //     const authorIdArray = unansweredQuestion.author.id

  //     this.setState({
  //       loadingAvatars: false,
  //       questionsAuthorsAvatars: {
  //         ...state,
  //         users[authorId].avatarURL
  //       }
  //     })
  //   })
  // }

  // Event handlers
  handleRadioChange = ({ value }) => {
    this.setState({ value })
  }

  render() {
    if (!this.props.user) {
      return null
    }
    console.log(this.props.unansweredQuestions)
    const { loadingAvatar } = this.state

    const unansweredQuestions = this.props.unansweredQuestions.map((unansweredQuestion) => {
      return (
        <Link key={unansweredQuestion.id} to={"questions/" + unansweredQuestion.id} >
          <div className="panel--question__preview question-box">
            <span>Asked by {unansweredQuestion.author}</span>
            {loadingAvatar ? (
              <Placeholder className="home-question-author__avatar--placeholder">
                <Placeholder.Image square />
              </Placeholder>
            ) : (
                <img
                  className="question-author__avatar"
                  src={this.state.authorAvatar}
                  alt="User-Avatar" />
              )}
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
            <span>Asked by {answeredQuestion.author}</span>
            {loadingAvatar ? (
              <Placeholder className="home-question-author__avatar--placeholder">
                <Placeholder.Image square />
              </Placeholder>
            ) : (
                <img
                  className="question-author__avatar"
                  src={this.state.authorAvatar}
                  alt="User-Avatar" />
              )}
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

const mapStateToProps = ({ user }) => ({
  user: user.user,
  unansweredQuestions: user.unansweredQuestions,
  answeredQuestions: user.answeredQuestions
})
export default connect(mapStateToProps)(QuestionsPanel);
