import React, { Component } from "react";

import * as api from "../utils/api";

class PostComment extends Component {
  state = { inputComment: "" };
  render() {
    return (
      <form className="PostComment" onSubmit={this.postComment}>
        <label>Post a comment:</label>
        {"  "}
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.inputComment}
        />

        <button type="submit" disabled={!this.state.inputComment}>
          {" "}
          post!
        </button>
      </form>
    );
  }
  postComment = (event) => {
    event.preventDefault();
    const { article_id, user } = this.props;
    const body = this.state.inputComment;
    api.postComment(article_id, user, body).then((comment) => {
      this.props.addComment(comment);
      this.setState({ inputComment: "" });
    });
  };
  handleChange = (event) => {
    this.setState({ inputComment: event.target.value });
  };
}

export default PostComment;
