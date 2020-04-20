import React, { Component } from "react";
import * as api from "../utils/api";

class Voter extends Component {
  state = {
    optiVotes: 0,
  };

  render() {
    return (
      <div>
        <p>
          current votes: {this.props.votes + this.state.optiVotes}
          <button
            className="UpVote"
            onClick={() => this.handleClick(1)}
            disabled={this.state.optiVotes > 0}
          >
            up
          </button>
          <button
            className="DownVote"
            onClick={() => this.handleClick(-1)}
            disabled={this.state.optiVotes < 0}
          >
            down
          </button>
        </p>
      </div>
    );
  }
  handleClick = (votes) => {
    const { type } = this.props;
    this.setState((currentState) => {
      return { optiVotes: currentState.optiVotes + votes };
    });
    if (type === "article") {
      api.patchArticle(this.props.id, votes);
    } else {
      api.patchComment(this.props.id, votes, type);
    }
  };
}

export default Voter;
