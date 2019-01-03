import React from "react";

import Jersey from "./Jersey";
import Enroll from "./Enroll";

const Promotions = () => {
  return (
    <div className="promotion_wrapper" style={{ background: "#ffffff" }}>
      <div className="container">
        <Jersey />
        <Enroll />
      </div>
    </div>
  );
};

export default Promotions;
