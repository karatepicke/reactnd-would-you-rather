import React from 'react';
import { connect } from 'react-redux';

// custom components
import WYRNavbar from '../components/Navigation';

// UI
import { Container, Segment, Form, Icon, Divider } from 'semantic-ui-react';

class NewQuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionOne: '',
      optionTwo: '',
      optionsIncomplete: false,
      questionAdded: false
    }
  }

  componentWillMount() {
    if (!this.props.user) {
      this.props.history.push('/login')
    }
  }

  componentWillReceiveProps(props) {
    if (!props.user) {
      props.history.push('/login')
    }
  }

  // Event handlers
  handleFormSubmit(e) {
    e.preventDefault()
    const optionOneText = this.optionOne.value
    const optionTwoText = this.optionTwo.value
    console.log(optionOneText, optionTwoText )

    this.setState({
        displayErrorMessage1:false,
        displayErrorMessage2:false
    })

    if(optionOneText && optionTwoText) {
      _saveQuestion({
          optionOneText,
          optionTwoText,
          author: this.props.user.id
        })

        this.props.history.push('/')
    } else {
        optionOneText === '' && this.setState(() => ({displayErrorMessage1:true}))
        optionTwoText === '' && this.setState(() => ({displayErrorMessage2:true}))
    }
  }

  render() {
    if (!this.props.user) {
      return null
    }
    return (
      <div>
        <WYRNavbar active="questions" />
        <section className="main">
          <Container className="my-container">
          <Segment>
            <h2>Your're posting as {this.props.user.name}</h2>
            <span>Here you can post your own question for the community to answer</span>
            <Icon name="question circle"/>
            <p>Complete the question:</p>
            <h3>Would you rather...</h3>
            <Form onSubmit={this.handleFormSubmit.bind(this)}>
            <Form.Field>
              <label>Option One</label>
              <input
                ref={input => this.optionOne = input}
                placeholder='First option'
              />
            </Form.Field>
            <Divider horizontal>Or</Divider>
            <Form.Field>
              <label>Option Two</label>
              <input
                ref={input => this.optionTwo = input}
                placeholder='Second option'
                />
            </Form.Field>
            <Form.Button>Submit</Form.Button>
            </Form>
          </Segment>
          </Container>
        </section>
      </div>
    )
  }
}

const mapStateToProps = ({ user, questions }) => ({
  user: user.user,
  questions: questions.questions
})
export default connect(mapStateToProps)(NewQuestionPage);
