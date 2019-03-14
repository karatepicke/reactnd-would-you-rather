import React from 'react';
import { connect } from 'react-redux';
const placeholderImg = 'https://semantic-ui.com/images/wireframe/image.png'

class ImpersonationBadge extends React.Component {
  render() {
    if (!this.props.user) {
      return null
    }
    return (
      <div className="impersonation-badge">
        <img className="impersonation-badge--avatar" src={this.getImageUrl()}></img>
        <span>{this.props.user.name}</span>
      </div >
    )
  }

  getImageUrl() {
    if (this.props.user.avatarURL === '' || this.props.user.avatarURL === undefined ) {
      return placeholderImg
    } else {
      return this.props.user.avatarURL
    }
  }
}

const mapStateToProps = ({ authedUser }) => ({ user: authedUser.user })
export default connect(mapStateToProps)(ImpersonationBadge);
