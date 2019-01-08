import React from "react";
import { Switch } from "react-router-dom";

import Layout from "./hoc/Layout";
import Home from "./component/home/Home";
import SignIn from "./component/signIn/SignIn";
import Dashboard from "./component/admin/Dashboard";
import PrivateRoute from "./component/authRoute.js/PrivateRoute";
import PublicRoute from "./component/authRoute.js/PublicRoute";
import AdminMatches from "./component/admin/matches/AdminMatches";
import AddEditMatches from "./component/admin/matches/AddEditMatches";
import AdminPlayers from "./component/admin/players/AdminPlayers";
import AddEditPlayers from "./component/admin/players/AddEditPlayers";

const Routes = props => {
  return (
    <div>
      <Layout>
        <Switch>
          <PrivateRoute
            exact
            path="/edit_match/:id"
            component={AddEditMatches}
            {...props}
          />
          <PrivateRoute
            exact
            path="/edit_players"
            component={AddEditPlayers}
            {...props}
          />
          <PrivateRoute
            exact
            path="/edit_players/:id"
            component={AddEditPlayers}
            {...props}
          />
          <PrivateRoute
            exact
            path="/players"
            component={AdminPlayers}
            {...props}
          />
          <PrivateRoute
            exact
            path="/edit_match"
            component={AddEditMatches}
            {...props}
          />
          <PrivateRoute
            exact
            path="/dashboard"
            component={Dashboard}
            {...props}
          />
          <PrivateRoute
            exact
            path="/matches"
            component={AdminMatches}
            {...props}
          />
          <PublicRoute
            {...props}
            restricted={true}
            exact
            path="/sign_in"
            component={SignIn}
          />
          <PublicRoute
            {...props}
            exact
            path="/"
            restricted={false}
            component={Home}
          />
        </Switch>
      </Layout>
    </div>
  );
};

export default Routes;
