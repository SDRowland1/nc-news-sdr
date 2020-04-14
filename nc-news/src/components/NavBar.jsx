import React, { Component } from "react";
import * as api from "../utils/api";
import { Link } from "@reach/router";

class NavBar extends Component {
  state = { topics: [] };
  componentDidMount() {
    api.fetchTopics().then((topics) => {
      this.setState({ topics });
    });
  }
  render() {
    return (
      <div className="NavBar">
        <ul key="Nav" className="NavTopics">
          <Link to="/articles/all">
            <li>all articles</li>
          </Link>
          {this.state.topics.map((topic) => {
            return (
              <Link to={`/articles/${topic.slug}`}>
                {" "}
                <li key={topic.slug}>{topic.slug}</li>
              </Link>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default NavBar;
