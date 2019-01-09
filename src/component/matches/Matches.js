import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import { firebaseMatches } from "../../firebase";
import {
  firebaseLooper,
  reverseMatchesFromDatabase
} from "../../util/MiscMatches";
import LeagueTable from "./LeagueTable";
import MatchesList from "./MatchesList";

class Matches extends Component {
  state = {
    isLoading: true,
    matches: [],
    filterMatches: [],
    filterPlayer: "All",
    filterResult: "All"
  };

  componentDidMount() {
    firebaseMatches.once("value").then(snapshot => {
      const matches = firebaseLooper(snapshot);

      this.setState({
        isLoading: false,
        matches: reverseMatchesFromDatabase(matches),
        filterMatches: reverseMatchesFromDatabase(matches)
      });
    });
  }

  showResult = result => {
    const list = this.state.matches.filter(match => {
      return match.result === result;
    });
    this.setState({
      filterMatches: result === "All" ? this.state.matches : list,
      filterPlayer: "All",
      filterResult: result
    });
  };

  showPlayed = option => {
    const list = this.state.matches.filter(match => {
      return match.final === option;
    });
    this.setState({
      filterMatches: option === "All" ? this.state.matches : list,
      filterPlayer: option,
      filterResult: "All"
    });
  };

  render() {
    const state = this.state;
    return (
      <div className="the_matches_container">
        <div className="the_matches_wrapper">
          <div className="left">
            <div className="match_filters">
              <div className="match_filters_box">
                <div className="tag">Show Match</div>
                <div className="cont">
                  <div
                    className={`option ${
                      state.filterPlayer === "All" ? "active" : ""
                    }`}
                    onClick={() => this.showPlayed("All")}
                  >
                    All
                  </div>
                  <div
                    className={`option ${
                      state.filterPlayer === "Yes" ? "active" : ""
                    }`}
                    onClick={() => this.showPlayed("Yes")}
                  >
                    Played
                  </div>
                  <div
                    className={`option ${
                      state.filterPlayer === "No" ? "active" : ""
                    }`}
                    onClick={() => this.showPlayed("No")}
                  >
                    Not Played
                  </div>
                </div>
              </div>
              <div className="match_filters_box">
                <div className="tag">Result</div>
                <div className="cont">
                  <div
                    className={`option ${
                      state.filterResult === "All" ? "active" : ""
                    }`}
                    onClick={() => this.showResult("All")}
                  >
                    All
                  </div>
                  <div
                    className={`option ${
                      state.filterResult === "W" ? "active" : ""
                    }`}
                    onClick={() => this.showResult("W")}
                  >
                    W
                  </div>
                  <div
                    className={`option ${
                      state.filterResult === "L" ? "active" : ""
                    }`}
                    onClick={() => this.showResult("L")}
                  >
                    L
                  </div>
                  <div
                    className={`option ${
                      state.filterResult === "D" ? "active" : ""
                    }`}
                    onClick={() => this.showResult("D")}
                  >
                    D
                  </div>
                </div>
              </div>
            </div>
            <MatchesList matches={state.filterMatches} />
          </div>
          <div className="right">
            <LeagueTable />
          </div>
        </div>
      </div>
    );
  }
}

export default Matches;
