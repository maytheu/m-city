import React, { Component } from "react";
import Reveal from "react-reveal/Reveal";

import { Tag } from "../../../util/MiscMatches";
import stripes from "../../../assets/images/stripes.png";
import Cards from './Cards'

class MeetPlayers extends Component {

    state = {
        reveal: false
    }
  render() {
    return (
      <Reveal
      fraction={0.7}
      onReveal={() => {this.setState({reveal: true})}}>
        <div
          style={{ background: `#ffffff url(${stripes})` }}
          className="home_meetplayers"
        >
          <div className="container">
            <div className="home_meetplayers_wrapper">
              <div className="home_card_wrapper">
                <Cards reveal={this.state.reveal} />
              </div>
              <div className="home_text_wrapper">
                <Tag
                  bck="#0e1731"
                  size="100px"
                  color="#ffffff"
                  add={{
                    display: "inline-block",
                    marginBottom: "20px"
                  }}
                >
                  Meet
                </Tag>
                <Tag
                  bck="#0e1731"
                  size="100px"
                  color="#ffffff"
                  add={{
                    display: "inline-block",
                    marginBottom: "20px"
                  }}
                >
                  The
                </Tag>
                <Tag
                  bck="#0e1731"
                  size="100px"
                  color="#ffffff"
                  add={{
                    display: "inline-block",
                    marginBottom: "20px"
                  }}
                >
                  Players
                </Tag>
                <Tag
                  bck="#ffffff"
                  size="27px"
                  color="#0e1731"
                  Link={true}
                  linkTo="/the_team"
                  add={{
                    display: "inline-block",
                    marginBottom: "20px",
                    border: "1px solid #0e1731"
                  }}
                >
                  Meet them here
                </Tag>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    );
  }
}

export default MeetPlayers;
