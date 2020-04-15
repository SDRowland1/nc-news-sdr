import React, { Component } from "react";
import * as api from "../utils/api";

class Voter extends Component {
  state = {
    optiVotes: 0,
  };

  render() {
    return (
      <div>
        <p>current votes: {this.props.votes + this.state.optiVotes}</p>
        <button
          onClick={() => this.handleClick(1)}
          disabled={this.state.optiVotes > 0}
        >
          up
        </button>
        <button
          onClick={() => this.handleClick(-1)}
          disabled={this.state.optiVotes < 0}
        >
          down
        </button>
      </div>
    );
  }
  handleClick = (votes) => {
    this.setState((currentState) => {
      return { optiVotes: currentState.optiVotes + votes };
    });
    api.patchArticle(this.props.id, votes);
  };
}

export default Voter;
