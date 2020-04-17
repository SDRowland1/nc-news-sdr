import React, { Component } from "react";
import * as api from "../utils/api";
import Loader from "./Loader";
import Voter from "./Voter";

import PostComment from "./PostComment";
import DeleteComment from "./DeleteComment";
import ErrorHandler from "./ErrorHandler";

class Comments extends Component {
  state = { comments: [], isLoading: true, err: null };

  componentDidMount() {
    this.getComments();
  }

  render() {
    const { err } = this.state;
    if (err) return <ErrorHandler error={err} />;
    if (this.state.isLoading) return <Loader />;
    return (
      <div>
        <PostComment
          user={this.props.user}
          article_id={this.props.article_id}
          addComment={this.addComment}
        />
        {this.state.comments.map((comment) => {
          const { author, created_at, body, votes, comment_id } = comment;
          return (
            <ul key={comment_id} className="Comment">
              <li>
                <h4>{author}</h4>{" "}
              </li>

              <li>{body}</li>
              <li>
                <Voter votes={votes} id={comment_id} type="comment" />
              </li>
              <li>date created: {created_at}</li>
              {this.props.user === author && (
                <DeleteComment
                  id={comment_id}
                  deletedComment={this.deletedComment}
                />
              )}
            </ul>
          );
        })}
      </div>
    );
  }
  getComments = () => {
    api
      .fetchCommentsFromArticle(this.props.article_id)
      .then((comments) => {
        this.setState({ comments, isLoading: false }, () => {});
      })
      .catch((err) => {
        this.setState({ err });
      });
  };
  deletedComment = (comment_id) => {
    this.setState((currentState) => {
      const filteredComments = [];
      currentState.comments.forEach((comment) => {
        if (comment.comment_id !== comment_id) {
          filteredComments.push(comment);
        }
      });

      return { comments: filteredComments };
    });
  };
  addComment = (newComment) => {
    this.setState((currentState) => {
      return { comments: [...currentState.comments, newComment] };
    });
    this.getComments();
  };
}

export default Comments;
