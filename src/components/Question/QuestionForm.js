import React from 'react';
import { getUnansweredQuestionsForSignedInUser } from '../../store/actions/user';
import { connect } from 'react-redux';

// UI
import { Segment, Form, Grid, Divider } from 'semantic-ui-react';

// API
import { _getQuestions, _saveQuestionAnswer, _getUsers } from '../../data/_DATA';

const placeholderImg = 'https://semantic-ui.com/images/wireframe/image.png'

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
    _saveQuestionAnswer({ authedUser: this.props.user.id, qid: this.props.currentQuestion.id, answer: this.state.checked }).then((question) => {
      console.log(question)
    })
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
