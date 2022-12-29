import React from 'react';
import image from '../../assets/pokemon-logo.png';
import './Header.scss';

export const Header = () => {

    return (
        <div className="headerContainer">
            <img className='headerLogo' src={image} alt="Logo" />
            <p className="headerTitle">This is a application for the Subvisual Challenge code :)</p>
        </div>
    );
};
