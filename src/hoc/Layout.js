import React from 'react';

import Header from '../component/header_footer/Header'
import Footer from '../component/header_footer/Footer'

const Layout = (props) => {
    return (
        <div>
            <Header />
            {props.children}
            <Footer />
        </div>
    );
};

export default Layout;