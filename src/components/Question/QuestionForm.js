import React from 'react';
import { connect } from 'react-redux';

// Actions
import { getUnansweredQuestionsForSignedInUser } from '../../store/actions/user';
import { saveQuestionAnswer } from '../../store/actions/questions';

// UI
import { Segment, Form, Grid, Divider, Placeholder } from 'semantic-ui-react';

// API
import { _getQuestions, _getUsers } from '../../data/_DATA';

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 'optionOne',
      loadingAvatar: true,
      authorAvatar: ''
    }
  }

  componentWillMount() {
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

  // Event handlers
  handleRadioChange(currentTarget) {
    this.setState({
      checked: currentTarget
    })
  }

  handleFormSubmit(e) {
    e.preventDefault()
    this.props.dispatch(saveQuestionAnswer(this.props.authedUser, this.props.currentQuestion.id, this.state.checked))
    this.props.history.push(`/results/${this.props.currentQuestion.id}`)
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
              <h3>{this.props.currentQuestion.author} asks:</h3>
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
              <Form onSubmit={this.handleFormSubmit.bind(this)}>
                <Grid.Row columns={2}>
                  <Grid.Column textAlign='center' className="question-box">
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
                  </Grid.Column>
                  <Grid.Column textAlign='center' className="question-box">
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
                  </Grid.Column>
                <Form.Button>Submit</Form.Button>
                </Grid.Row>
              </Form>
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
export default connect(mapStateToProps)(QuestionForm);
