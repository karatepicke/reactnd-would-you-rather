import React from 'react';
import { connect } from 'react-redux';

// Actions
import { getUnansweredQuestionsForSignedInUser } from '../../store/actions/user';
import { saveQuestionAnswer } from '../../store/actions/questions';

// UI
import { Segment, Form, Grid, Divider } from 'semantic-ui-react';

// API
import { _getQuestions, _getUsers } from '../../data/_DATA';

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: 'optionOne',
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
    this.props.history.push('/')
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
              <h3>{this.props.currentQuestion.author} asks:</h3>
              <div className="center-image">
                <img
                  className="question-author--avatar"
                  src={this.state.authorAvatar}
                  alt="User-Avatar" />
              </div>
            </Grid.Column>
            <Grid.Column>
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
