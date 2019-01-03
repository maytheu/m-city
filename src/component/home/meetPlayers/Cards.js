import React, { Component } from "react";
import { easePolyOut } from "d3-ease";
import Animate from "react-move/Animate";

import Otamendi from "../../../assets/images/players/Otamendi.png";
import Players from "../../../util/Players";

class Cards extends Component {
  state = {
    cards: [
      {
        bottom: 90,
        left: 300
      },
      {
        bottom: 60,
        left: 200
      },
      {
        bottom: 30,
        left: 100
      },
      {
        bottom: 0,
        left: 0
      }
    ]
  };

  animateCards = () =>
    this.state.cards.map((card, index) => (
      <Animate
        key={index}
        show={this.props.reveal}
        start={{ left: 0, bottom: 0 }}
        enter={{
          left: [card.left],
          bottom: [card.bottom],
          timing: { duration: 500, ease: easePolyOut }
        }}
      >
        {({ bottom, left }) => {
          return (
            <div
              style={{
                position: "absolute",
                left,
                bottom
              }}
            >
              <Players
                number="30"
                firstName="Nicolas"
                lastName="Otamendi"
                bck={Otamendi}
              />
            </div>
          );
        }}
      </Animate>
    ));

  render() {
    return <div>{this.animateCards()}</div>;
  }
}

export default Cards;
