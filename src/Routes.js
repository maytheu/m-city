import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Layout from './hoc/Layout';
import Home from './component/home/Home';

const Routes = () => {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path='/' component={Home}/>
        </Switch>
      </Layout>
    </div>
  );
};

export default Routes;