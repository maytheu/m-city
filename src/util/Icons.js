import React from 'react'
import { Link } from 'react-router-dom'

import mLogo from '../assets/images/logos/manchester_city_logo.png'

export const CityIcon = (props) => {
    const template = <div 
        className="img_cover"
        style={{
            width: props.width,
            height: props.height,
            background: `url(${mLogo}) no-repeat`
        }} />
    if(props.linkTo){
        return <Link to={props.linkTo} className="link_logo">{template}</Link>
    }else{
        return template
    }
}