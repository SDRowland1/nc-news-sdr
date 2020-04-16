import React, { Component } from "react";
import * as api from "../utils/api";

class DeleteComment extends Component {
  state = { isDeleted: false };

  render() {
    return (
      <div>
        {!this.state.isDeleted ? (
          <button onClick={this.removeComment}>Delete Comment</button>
        ) : (
          <p>Deleteting...</p>
        )}
      </div>
    );
  }
  removeComment = () => {
    const { id } = this.props;
    api.deleteComment(id);
    this.setState({ isDeleted: true });
    this.props.deletedComment(id);
  };
}

export default DeleteComment;
