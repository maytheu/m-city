import React from 'react'

import { CityIcon } from '../../util/Icons'

const Footer = (props) => (
    <footer className="bck_blue">
        <div className="footer_logo">
            <CityIcon width="70px" height="70px" Link={true} linkTo="/" />
        </div>
        <div className="footer_disc">Manchester City 2018, All right reserved.</div>
    </footer>
)

export default Footer