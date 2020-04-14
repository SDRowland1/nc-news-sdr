import React, { Component } from "react";
import * as api from "../utils/api";
import Loader from "./Loader";
import { Link } from "@reach/router";

class Comments extends Component {
  state = { comments: [], isLoading: true };
  componentDidMount() {
    api.fetchCommentsFromArticle(this.props.article_id).then((comments) => {
      this.setState({ comments, isLoading: false }, () => {
        console.log(this.state.comments);
      });
    });
  }
  render() {
    if (this.state.isLoading) return <Loader />;
    return (
      <div>
        <Link
          to={`/articles/${this.props.slug}/${this.state.comments[0].article_id}`}
        >
          {" "}
          Back to article!
        </Link>{" "}
        {this.state.comments.map((comment) => {
          const { author, created_at, body, votes, comment_id } = comment;
          return (
            <ul key={comment_id} className="Comment">
              <li>
                <h4>{author}</h4>{" "}
              </li>

              <li>{body}</li>
              <li>
                Votes: {votes} <input type="checkbox" />
                <input type="checkbox" />
              </li>
              <li>date created: {created_at}</li>
            </ul>
          );
        })}
      </div>
    );
  }
}

export default Comments;
