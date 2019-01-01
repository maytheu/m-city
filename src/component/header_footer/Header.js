import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

import  { CityIcon } from '../../util/Icons'

class Header extends Component {
    render() {
        return (
            <AppBar
                position="fixed"
                style={{
                    backgroundColor: '#98c5e9',
                    boxShadow: 'none',
                    padding: '10px 0',
                    borderBottom: '2px solid #00285e'
                }}    
            >
                <Toolbar style={{display: 'flex'}}>
                    <div style={{flexGrow: 1}}>
                        <div className="header_logo">
                            <CityIcon Link={true} linkTo="/" width='70px' height='70px' />
                        </div>
                    </div>
                    <Link to="teams"><Button color="inherit">Teams</Button></Link>
                    <Link to="matches"><Button color="inherit">Matches</Button></Link>

                </Toolbar>

            </AppBar>
        );
    }
}

export default Header;