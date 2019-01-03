import React from "react";
import { Link } from "react-router-dom";

export const Tag = props => {
  const template = (
    <div
      style={{
        background: props.bck,
        color: props.color,
        fontSize: props.size,
        padding: "5px 10px",
        font: "righteous",
        display: "inline-block",
        ...props.add
      }}
    >
      {props.children}
    </div>
  );
  if (props.Link) {
    return <Link to={props.linkTo}>{template}</Link>;
  } else {
    return template;
  }
};

export const firebaseLooper = snapshot => {
  const data = [];
  snapshot.forEach(childSnapshot => {
    data.push({
      ...childSnapshot.val(),
      id: childSnapshot.key
    });
  });
  return data;
};

export const reverseMatchesFromDatabase = actualMatches => {
  const reverseMatches = [];
  for (let i = actualMatches.length - 1; i >= 0; i--) {
    reverseMatches.push(actualMatches[i]);
  }
  return reverseMatches;
};
