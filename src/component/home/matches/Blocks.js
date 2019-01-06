import React, { Component } from "react";
import Slide from "react-reveal/Slide";

import { firebaseMatches } from "../../../firebase";
import {
  firebaseLooper,
  reverseMatchesFromDatabase
} from "../../../util/MiscMatches";
import MatchBlock from "../../../util/MatchBlock";

class Blocks extends Component {
  state = { 
    matches: []
  };

  componentDidMount() {
    //make a request from the server to just 6
    firebaseMatches
      .limitToLast(6)
      .once("value")
      .then(snapshot => {
        const matches = firebaseLooper(snapshot);
        this.setState({ matches: reverseMatchesFromDatabase(matches) });
      });
  }

  showMatches = matches =>
    matches
      ? matches.map(match => (
          <Slide bottom key={match.id}>
            <div className="item">
              <div className="wrapper">
                <MatchBlock match={match} />
              </div>
            </div>
          </Slide>
        ))
      : null;

  render() {
    return (
      <div className="home_matches">{this.showMatches(this.state.matches)}</div>
    );
  }
}

export default Blocks;
