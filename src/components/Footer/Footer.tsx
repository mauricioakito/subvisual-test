import React from 'react';
import image from '../../assets/pokemon-logo.png';
import './Footer.scss';

export const Footer = () => {

    return (
        <div className="footerContainer">
            <img className='footerLogo' src={image} alt="Logo" />
            <p className="footerTitle">This is a application for the Subvisual Challenge code :)</p>
        </div>
    );
};
