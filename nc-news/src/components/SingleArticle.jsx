import React, { Component } from "react";
import * as api from "../utils/api";
import Loader from "./Loader";
import NavBar from "./NavBar";
import { Link, Router } from "@reach/router";
import Voter from "./Voter";
import ErrorHandler from "./ErrorHandler";
import Comments from "./Comments";
import ReactTimeAgo from "react-time-ago";

class SingleArticle extends Component {
  state = {
    article: {},
    isLoading: true,
    err: null,
  };
  componentDidMount() {
    api
      .fetchSingleArticle(this.props.article_id)
      .then((article) => {
        this.setState({ article, isLoading: false });
      })
      .catch((err) => {
        this.setState({ err }, () => {});
      });
  }
  render() {
    const {
      author,
      body,
      created_at,
      title,
      article_id,
      votes,
      comment_count,
    } = this.state.article;
    const { isLoading, err } = this.state;
    if (err) return <ErrorHandler error={err} />;

    return (
      <div className="SingleArticle">
        <NavBar />
        <div className="main">
          {isLoading && <Loader />}
          <h2>{title}</h2>
          <p>Written by: {author}</p>

          <p>{body}</p>
          <p>
            Date Published: {created_at && <ReactTimeAgo date={created_at} />}
          </p>

          <Voter votes={votes} id={article_id} type="article" />

          <Link to={`/articles/${article_id}/comments`}>
            <p>Comments: {comment_count}</p>
          </Link>
          <Router>
            <Comments path="/comments" user={this.props.user} />
          </Router>
        </div>
      </div>
    );
  }
}

export default SingleArticle;
