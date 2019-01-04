import React from "react";
import { Switch, Route } from "react-router-dom";

import Layout from "./hoc/Layout";
import Home from "./component/home/Home";
import SignIn from "./component/signIn/SignIn";
import Dashboard from "./component/admin/Dashboard";
import PrivateRoute from "./component/authRoute.js/PrivateRoute";

const Routes = (props) => {
  console.log(props)
  return (
    <div>
      <Layout>
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} {...props} />
          <Route exact path="/sign_in" component={SignIn} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Layout>
    </div>
  );
};

export default Routes;
