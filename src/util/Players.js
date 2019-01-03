import React from "react";

const Players = props => {
  return (
    <div className="player_card_wrapper">
      <div
        className="player_card_thmb"
        style={{ background: `#f2f9ff url(${props.bck})` }}
      />
      <div className="player_card_nfo">
        <div className="player_card_number">{props.number}</div>
        <div className="player_card_name">
          <span>{props.firstName}</span>
          <span>{props.lastName}</span>
        </div>
      </div>
    </div>
  );
};

export default Players;
