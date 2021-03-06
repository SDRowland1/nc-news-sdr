import React, { Component } from "react";
import Header from "./components/Header";
import User from "./components/User";
import "./App.css";
import HomeTopics from "./components/HomeTopics";
import ArticlesList from "./components/ArticlesList";
import { Router, Link } from "@reach/router";

import SingleArticle from "./components/SingleArticle";

import ErrorHandler from "./components/ErrorHandler";

class App extends Component {
  state = { user: "weegembump" };
  render() {
    return (
      <div className="App">
        <header className="HeaderComps">
          <Link className="HeaderLink" to="/">
            <Header />
          </Link>
          <User username={this.state.user} />
        </header>
        <Router>
          <HomeTopics path="/" />
          <ArticlesList path="/articles" />
          <ArticlesList path="/topics/:slug" />
          <SingleArticle
            path="/articles/:article_id/*"
            user={this.state.user}
          />
          <ErrorHandler default />
        </Router>
      </div>
    );
  }
}

export default App;
