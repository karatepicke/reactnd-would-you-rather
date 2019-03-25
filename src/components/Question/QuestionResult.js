import React from 'react';
import { connect } from 'react-redux';

// Actions
import { getUnansweredQuestionsForSignedInUser } from '../../store/actions/user';
import { saveQuestionAnswer } from '../../store/actions/questions';

// UI
import { Segment, Grid, Divider, Placeholder, Icon, Progress } from 'semantic-ui-react';

// API
import { _getQuestions, _getUsers } from '../../data/_DATA';

class QuestionResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 'optionOne',
      loadingAvatar: true,
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

      this.setState({ 
        loadingAvatar: false,
        authorAvatar: users[authorId].avatarURL 
      })
    })
  }

  render() {
    const { loadingAvatar } = this.state 
    let optionOneVotes, optionTwoVotes, optionOnePercentage, optionTwoPercentage, total = 0
    let authedUserAnswer = ''

    if (this.props.currentQuestion !== undefined) {
      optionOneVotes = Number(this.props.currentQuestion.optionOne.votes.length)
      optionTwoVotes = Number(this.props.currentQuestion.optionTwo.votes.length)
      total = optionOneVotes + optionTwoVotes
      optionOnePercentage = (optionOneVotes / total) * 100
      optionTwoPercentage = (optionTwoVotes / total) * 100
      authedUserAnswer = this.props.user.answers[this.props.currentQuestion.id]
    }


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
              {loadingAvatar ? (
                <Placeholder className="question-author__avatar--placeholder">
                  <Placeholder.Image square />
                </Placeholder>
              ) : (
                <img
                  className="question-author__avatar"
                  src={this.state.authorAvatar}
                  alt="User-Avatar" />
              )}
              </div>
            </Grid.Column>
            <Grid.Column width={11}>
              <Grid.Row columns={2}>
                <Grid.Column textAlign='center'>
                  <div className="result-box">
                    <h3>Would you rather {this.props.currentQuestion.optionOne.text}?</h3>
                    <Progress percent={optionOnePercentage} progress color='teal' />
                    <p className="votes">{optionOneVotes} out of {total} votes</p>
                    {authedUserAnswer === 'optionOne' && <Icon name='star' size='huge'/>}
                  </div>
                </Grid.Column>
                <Grid.Column textAlign='center'>
                  <div className="result-box">
                    <h3>Would you rather {this.props.currentQuestion.optionTwo.text}?</h3>
                    <Progress percent={optionTwoPercentage} progress color='teal' />
                    <p className="votes">{optionTwoVotes} out of {total} votes</p>
                    {authedUserAnswer === 'optionTwo' && <Icon name='star' size='huge'/>}
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Segment>
      </div >
    )
  }
}

const mapStateToProps = ({ user, questions }) => ({
  user: user.user,
  currentQuestion: questions.currentQuestion
})
export default connect(mapStateToProps)(QuestionResult);
