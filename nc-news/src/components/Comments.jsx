import React, { Component } from "react";
import * as api from "../utils/api";
import Loader from "./Loader";
import Voter from "./Voter";
import { Link } from "@reach/router";

class Comments extends Component {
  state = { comments: [], isLoading: true, inputComment: "" };
  componentDidMount() {
    this.getComments();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.comments.length !== this.state.comments.length)
      this.getComments();
  }

  getComments = () => {
    api.fetchCommentsFromArticle(this.props.article_id).then((comments) => {
      this.setState({ comments, isLoading: false }, () => {});
    });
  };
  render() {
    if (this.state.isLoading) return <Loader />;
    return (
      <div>
        <Link to={`/articles/${this.state.comments[0].article_id}`}>
          {" "}
          Back to article!
        </Link>{" "}
        <form onSubmit={this.postComment}>
          <input type="text" onChange={this.handleChange} />{" "}
          <button type="submit"> post!</button>
        </form>
        {this.state.comments.map((comment) => {
          const {
            author,
            created_at,
            body,
            votes,
            comment_id,
            article_id,
          } = comment;
          return (
            <ul key={comment_id} className="Comment">
              <li>
                <h4>{author}</h4>{" "}
              </li>

              <li>{body}</li>
              <li>
                <Voter votes={votes} id={article_id} />
              </li>
              <li>date created: {created_at}</li>
              {this.props.user === author && <button>Delete</button>}
            </ul>
          );
        })}
      </div>
    );
  }
  postComment = (event) => {
    const { article_id, user } = this.props;
    const body = event.target.children[0].value;

    event.preventDefault();
    api.postComment(article_id, user, body);
  };
  handleChange = (event) => {
    this.setState({ inputComment: event.target.value }, () => {});
  };
}

export default Comments;
