import React from "react";

import Stripe from "./Stripe";
import Text from "./Text";

const Featured = () => {
  return (
    <div className="featured_wrapper">
      <Stripe />
      <Text />
    </div>
  );
};

export default Featured;
