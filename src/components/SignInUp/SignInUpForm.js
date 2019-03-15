import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { _getUsers } from '../../data/_DATA';
import { connect } from 'react-redux';
import { setUser } from '../../store/actions/user';

class SignInUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      password: ''
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} >
        <Form.Field>
          <input type="text" placeholder='User-Id' name="userId" value={this.state.userId} onChange={this.handleInputChange.bind(this)} />
        </Form.Field>
        <Form.Field>
          <input placeholder='Password' type="password" name="password" value={this.state.password} onChange={this.handleInputChange.bind(this)} />
        </Form.Field>
        <Button type='submit'>Login</Button>
      </Form>
    )
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    _getUsers().then(
      (users) => {
        const user = users[this.state.userId]
        if (user) {
          this.props.dispatch(setUser(user))
        } else {
          console.log('Not a valid user')
        }
      }
    )
  }
}

export default connect()(SignInUpForm);
