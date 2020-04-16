import React, { Component } from "react";
import * as api from "../utils/api";
import Loader from "./Loader";
import NavBar from "./NavBar";
import { Link } from "@reach/router";
import ArticleVoter from "./ArticleVoter";
import ErrorHandler from "./ErrorHandler";

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
    if (isLoading) return <Loader />;
    return (
      <div className="SingleArticle">
        <NavBar />
        <div className="main">
          <h2>{title}</h2>
          <p>Written by: {author}</p>

          <p>{body}</p>
          <p>Date Published: {created_at}</p>

          <ArticleVoter votes={votes} id={article_id} />

          <Link to={`/articles/${article_id}/comments`}>
            <p>Comments: {comment_count}</p>
          </Link>
        </div>
      </div>
    );
  }
}

export default SingleArticle;
