import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import { Promise } from "core-js";

import stripe from "../../assets/images/stripes.png";
import { firebasePlayers, firebase } from "../../firebase";
import { firebaseLooper } from "../../util/MiscMatches";
import Players from "../../util/Players";

class Team extends Component {
  state = {
    loading: true,
    players: []
  };

  componentDidMount() {
    firebasePlayers.once("value").then(snapshot => {
      const players = firebaseLooper(snapshot);
      let promises = [];
      for (let key in players) {
        promises.push(
          new Promise((resolve, reject) => {
            firebase
              .storage()
              .ref("players")
              .child(players[key].image)
              .getDownloadURL()
              .then(url => {
                players[key].url = url;
                resolve();
              });
          })
        );
      }
      Promise.all(promises).then(() => {
        this.setState({
          loading: false,
          players
        });
      });
    });
  }

  showPlayersByCategory = category =>
    this.state.players
      ? this.state.players.map((player, index) => {
          return player.position === category ? (
            <Fade left delay={index} key={index}>
              <div className="item">
                <Players
                  number={player.number}
                  firstName={player.name}
                  lastName={player.lastname}
                  bck={player.url}
                />
              </div>
            </Fade>
          ) : null;
        })
      : null;

  render() {
    console.log(this.state.players);
    return (
      <div
        className="the_team_container"
        style={{ background: `url(${stripe}) repeat` }}
      >
        {!this.state.loading ? (
          <div>
            <div className="team_category_wrapper">
              <div className="title">Keepers</div>
              <div className="team_cards">
                {this.showPlayersByCategory("Keeper")}
              </div>
            </div>
            <div className="team_category_wrapper">
              <div className="title">Defenders</div>
              <div className="team_cards">
                {this.showPlayersByCategory("Defence")}
              </div>
            </div>
            <div className="team_category_wrapper">
              <div className="title">Midfielders</div>
              <div className="team_cards">
                {this.showPlayersByCategory("Midfielder")}
              </div>
            </div>
            <div className="team_category_wrapper">
              <div className="title">Strikers</div>
              <div className="team_cards">
                {this.showPlayersByCategory("Striker")}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Team;
