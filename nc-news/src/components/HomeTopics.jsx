import React, { Component } from "react";
import * as api from "../utils/api";
import Loader from "./Loader";
import { Link } from "@reach/router";
import ArticleVoter from "./ArticleVoter";

class HomeTopics extends Component {
  state = {
    topics: [],
    homeArticle: {},
    isLoading: true,
  };

  componentDidMount() {
    api.fetchHomeScreenArticle().then((article) => {
      api.fetchTopics().then((topics) => {
        this.setState({ topics, homeArticle: article, isLoading: false });
      });
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
    } = this.state.homeArticle;
    if (this.state.isLoading) return <Loader />;
    return (
      <div className="HomeTopics">
        <ul className="topicList">
          <Link className="TopicLinks" to="/articles">
            <li key="allArticles">all articles</li>
          </Link>
          {this.state.topics.map((topic) => {
            return (
              <Link
                className="TopicLinks"
                key={topic.slug}
                to={`/topics/${topic.slug}`}
              >
                {" "}
                <li key={topic.slug}>{topic.slug}</li>
              </Link>
            );
          })}
        </ul>
        <main>
          <h2>Developers Pick!</h2>
          <h3>{title}</h3>
          <p>Written by: {author}</p>

          <p>{body}</p>
          <p>Date Published: {created_at}</p>

          <ArticleVoter votes={votes} id={article_id} />
        </main>
      </div>
    );
  }
}

export default HomeTopics;
