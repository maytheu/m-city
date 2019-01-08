import React from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import { firebase } from "../../../firebase";

const AdminNav = () => {
  const links = [
    {
      title: "Matches",
      linkTo: "/matches"
    },
    {
      title: "Add Matches",
      linkTo: "/edit_match"
    },
    {
      title: "Players",
      linkTo: "/players"
    },
    {
      title: "Add Players",
      linkTo: "/edit_players"
    }
  ];

  const style = {
    color: "#ffffff",
    borderBottom: "1px solid #353535",
    fontWeight: "300px"
  };

  const renderItems = () =>
    links.map(link => (
      <Link key={link.title} to={link.linkTo}>
        <ListItem button style={style}>
          {link.title}
        </ListItem>
      </Link>
    ));

  const logoutHandler = () => {
    firebase.auth().signOut();
  };

  return (
    <div>
      {renderItems()}
      <ListItem button style={style} onClick={() => logoutHandler()}>
        Logout
      </ListItem>
    </div>
  );
};

export default AdminNav;
