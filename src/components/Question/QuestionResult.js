import React from 'react';
import { connect } from 'react-redux';

// Actions
import { getUnansweredQuestionsForSignedInUser } from '../../store/actions/user';
import { saveQuestionAnswer } from '../../store/actions/questions';

// UI
import { Segment, Grid, Divider } from 'semantic-ui-react';

// API
import { _getQuestions, _getUsers } from '../../data/_DATA';

class QuestionResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 'optionOne',
      authorAvatar: ''
    }
  }

  componentWillMount() {
    if (!this.props.user) {
      this.props.history.push('/login')
      return
    }

    this.getAuthorAvatarUrl();
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

  getAuthorAvatarUrl() {
    _getUsers().then((users) => {
      const authorId = this.props.currentQuestion.author

      this.setState({ authorAvatar: users[authorId].avatarURL })
    })
  }

  render() {
    if (!this.props.currentQuestion) {
      return null
    }
    return (
      <div className="panel--question">
        <Segment>
          <h2>Would you rather?</h2>
          <Divider />
          <Grid columns={2} divided>
            <Grid.Column width={5}>
              <h3>{this.props.currentQuestion.author} asked:</h3>
              <div className="center-image">
                <img
                  className="question-author--avatar"
                  // src=""
                  src={this.state.authorAvatar}
                  alt="User-Avatar" />
              </div>
            </Grid.Column>
            <Grid.Column>
              {this.props.currentQuestion.optionOne.text}
              {this.props.currentQuestion.optionTwo.text}
            </Grid.Column>
          </Grid>
        </Segment>
      </div >
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.user
})
export default connect(mapStateToProps)(QuestionResult);
