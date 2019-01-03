import React from "react";
import Zoom from "react-reveal/Zoom";

import jersey from "../../../assets/images/jersey.jpg";

const Jersey = () => {
  return (
    <div className="promotion_animation">
      <div className="left">
        <Zoom>
          <span>Win a</span>
          <span>Jersey</span>
        </Zoom>
      </div>
      <div className="right">
        <Zoom>
          <div style={{ background: `url(${jersey}) no-repeat` }} />
        </Zoom>
      </div>
    </div>
  );
};

export default Jersey;
