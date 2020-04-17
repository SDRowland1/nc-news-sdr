import React, { Component } from "react";
import * as api from "../utils/api";
import NavBar from "./NavBar";
import { Link } from "@reach/router";
import Voter from "./Voter";
import ErrorHandler from "./ErrorHandler";
import Loader from "./Loader";

class ArticlesList extends Component {
  state = {
    articles: [],
    sort_by: "created_at",
    order: "asc",
    err: null,
    isLoading: true,
  };
  componentDidMount() {
    this.getArticles();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.slug !== this.props.slug) this.getArticles();
  }
  getArticles = () => {
    const { sort_by, order } = this.state;
    api
      .fetchArticles(this.props.slug, sort_by, order)
      .then((articles) => {
        this.setState({ articles, isLoading: false });
      })
      .catch((err) => {
        this.setState({ err });
      });
  };
  changeSortBy = (event) => {
    this.setState({ sort_by: event.target.value }, () => {
      this.getArticles();
    });
  };
  changeOrder = (event) => {
    this.setState({ order: event.target.value }, () => {
      this.getArticles();
    });
  };
  render() {
    const { isLoading, err } = this.state;
    if (err) return <ErrorHandler error={err} />;

    return (
      <div className="ArticlesList">
        <NavBar />
        {isLoading && <Loader />}
        <div className="main">
          <label>
            {" "}
            Sort By:
            <select onChange={this.changeSortBy} value={this.state.sort_by}>
              <option value="created_at">date posted</option>
              <option value="votes">votes</option>
              <option value="comment_count"> amount of comments</option>
            </select>
          </label>
          <label>
            Order By:
            <select onChange={this.changeOrder} value={this.state.order}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
          {this.state.articles.map((article) => {
            const {
              article_id,
              title,
              topic,
              author,
              votes,
              created_at,
              comment_count,
            } = article;
            return (
              <ul key={article_id} className="article">
                <Link to={`/articles/${article.article_id}`}>
                  <li>
                    <h3>{title}</h3>
                  </li>
                </Link>
                <li>topic: {topic}</li>
                <li>author: {author}</li>
                <li>
                  <Voter votes={votes} id={article_id} type="article" />{" "}
                </li>
                <li>created at: {created_at}</li>
                <li>comments: {comment_count}</li>
              </ul>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ArticlesList;
