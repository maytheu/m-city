import React from 'react';

import Layout from './hoc/Layout';
import Header from './component/header_footer/Header'
import Footer from './component/header_footer/Footer';

const Routes = () => {
  return (
    <div>
      <Layout>
        <Header />
        <Footer />
      </Layout>
    </div>
  );
};

export default Routes;