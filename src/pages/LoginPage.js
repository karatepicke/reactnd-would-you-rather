import React from 'react';
import WYRNavbar from '../components/Navigation';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import SignInUpPrompt from '../components/SignInUp/SignInUpPrompt';

class LoginPage extends React.Component {
  componentWillReceiveProps(props) {
    if (props.user) {
      props.history.push('/')
    }
  }

  render() {
    return (
      <div className="login">
        <WYRNavbar active="login" />
        <Container className="my-container">
          <SignInUpPrompt />
        </Container>
      </div>
    )
  }
}

const mapStateToProps = ({ authedUser }) => ({ user: authedUser.user })
export default connect(mapStateToProps)(LoginPage);
