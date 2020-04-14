import React, { Component } from "react";
import Header from "./components/Header";
import User from "./components/User";
import "./App.css";
import HomeTopics from "./components/HomeTopics";
import ArticlesList from "./components/ArticlesList";
import { Router } from "@reach/router";
import Home from "./components/Home";
import SingleArticle from "./components/SingleArticle";
import Comments from "./components/Comments";

class App extends Component {
  state = { user: "rogersop" };
  render() {
    return (
      <div className="App">
        <header className="HeaderComps">
          <Home />
          <Header />
          <User username={this.state.user} />
        </header>
        <Router>
          <HomeTopics path="/" />
          <ArticlesList path="/articles/all" />
          <ArticlesList path="/articles/:slug" />
          <SingleArticle path="/articles/:slug/:article_id" />
          <Comments path="/articles/:article_id/comments" />
        </Router>
      </div>
    );
  }
}

export default App;
