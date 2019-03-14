import React from 'react';
import WYRNavbar from '../components/Navigation';
import { connect } from 'react-redux';

class NewQuestionPage extends React.Component {
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

  render() {
    if (!this.props.user) {
      return null
    }
    return (
      <div className="login">
        <WYRNavbar active="questions" />
        <p>{this.props.user.name}</p>
      </div>
    )
  }
}

const mapStateToProps = ({ authedUser }) => ({ user: authedUser.user })
export default connect(mapStateToProps)(NewQuestionPage);