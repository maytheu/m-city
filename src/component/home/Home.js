import React from "react";

import Featured from "./featured/Featured";
import MatchesHome from "./matches/MatchesHome";
import MeetPlayers from "./meetPlayers/MeetPlayers";
import Promotions from "./promotions/Promotions";

const Home = () => {
  return (
    <div className="bck_blue">
      <Featured />
      <MatchesHome />
      <MeetPlayers />
      <Promotions />
    </div>
  );
};

export default Home;
