import React from 'react';
import { connect } from 'react-redux';

// custom components
import WYRNavbar from '../components/Navigation';

// UI
import { Container, Form } from 'semantic-ui-react';
import { handleAddQuestion } from '../store/actions/questions';

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
  handleOptionOneChange = (optionOne) => {
    this.setState({
        optionOne,
        optionsIncomplete: false,
        questionAdded: false
    });
  }
  handleOptionTwoChange = (optionTwo) => {
    this.setState({
        optionTwo,
        optionsIncomplete: false,
        questionAdded: false
    });
  }
  handleAddQuestionClick = () => {
    
  }

  handleFormSubmit(e) {
    // e.preventDefault()
    // this.props.dispatch(saveQuestionAnswer(this.props.authedUser, this.props.currentQuestion.id, this.state.checked))
    // this.props.history.push(`/results/${this.props.currentQuestion.id}`)

    if(this.state.optionOne.trim() === '' || this.state.optionTwo.trim() === ''){
      this.setState({ 
          optionsIncomplete: true,
          optionOne: '',
          optionTwo: '', 
      })
      return
  }
  this.props.dispatch(handleAddQuestion( this.state.optionOne, this.state.optionTwo, this.props.authedUser ))
  this.setState({ questionAdded: true, optionOne: '', optionTwo: '' })
  }

  render() {
    if (!this.props.user) {
      return null
    }
    return (
      <div>
        <WYRNavbar active="questions" />
        <Container className="my-container">
          <Form onSubmit={this.handleFormSubmit.bind(this)}>
          <Form.Field>
            <label>Option One</label>
            <input placeholder='First option' />
          </Form.Field>
          <Form.Field>
            <label>Option Two</label>
            <input placeholder='Second option' />
          </Form.Field>
          <Form.Button>Submit</Form.Button>
          </Form>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = ({ user, questions }) => ({ 
  user: user.user,
  questions: questions.questions
})
export default connect(mapStateToProps)(NewQuestionPage);


// render() {
// const { questionAdded, optionsIncomplete } = this.state
// return (
 
//         {questionAdded &&
//           <p>
//               <small className="pink-text">Question added. You can add more if you like </small>
//           </p>}
//         <div className="card center-block">
//           <h3>
//               <small>Add New Question</small>
//           </h3>
//           <p><small>Complete the Question:</small></p>
//           <p><small>Would you rather...</small></p>
//           <br />
//           {optionsIncomplete &&
//           <p>
//               <small className="pink-text">Please fill options one & two</small>
//           </p>}
//           <input type="text" placeholder="Enter option one text here" onChange={(e) => this.handleOptionOneChange(e.target.value)}/>
//           <span>Or</span>
//           <input type="text" placeholder="Enter option two text here" onChange={(e) => this.handleOptionTwoChange(e.target.value)}/>
//           <button className="addquestion" onClick={this.handleAddQuestionClick}>
//               Add Question
//           </button>


// );
// }
// }

// function mapStateToProps ({ authedUser, questions }) {
// return {
//   authedUser,
//   questions,
// }
// }

// export default connect(mapStateToProps)(AddQuestion)