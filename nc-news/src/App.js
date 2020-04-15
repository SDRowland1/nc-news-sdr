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
  state = { user: "weegembump" };
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
          <ArticlesList path="/articles" />
          <ArticlesList path="/topics/:slug" />
          <SingleArticle path="/articles/:article_id" />
          <Comments
            user={this.state.user}
            path="/articles/:article_id/comments"
          />
        </Router>
      </div>
    );
  }
}

export default App;
