import React, { Component } from "react";
import * as api from "../utils/api";
import NavBar from "./NavBar";
import { Link } from "@reach/router";

class ArticlesList extends Component {
  state = {
    articles: [],
  };
  componentDidMount() {
    api.fetchArticles(this.props.slug).then((articles) => {
      this.setState({ articles }, () => {
        console.log(this.state);
      });
    });
  }
  render() {
    return (
      <div className="ArticlesList">
        <NavBar />
        <div className="main">
          {this.state.articles.map((article) => {
            return (
              <Link to={`/articles/${this.props.slug}/${article.article_id}`}>
                <ul key={article.article_id} className="article">
                  <li>title: {article.title}</li>
                  <li>topic: {article.topic}</li>
                  <li>author: {article.author}</li>
                  <li>votes: {article.votes} </li>
                  <li>created at: {article.created_at}</li>
                </ul>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ArticlesList;
