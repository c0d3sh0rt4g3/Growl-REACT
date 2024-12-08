import React from 'react';
import {NavLink} from "react-router-dom";
import "../../css/404.css"
import knife from "../../assets/knife.png";

const NotFound = () => {
    return (
        <main id="not-found-main">
            <img id="rotating-knife" src={knife} alt="Rotating knife"/>
            <main id="error-texts-container">
                <h1 id="error-type">404 Page Not Found</h1>
                <p>Sorry, but the page you were trying to view does not exist.</p>
                <NavLink to={"/"} id={"back-to-home-btn"}> Go back to the main page</NavLink>
            </main>
        </main>
    );
};

export default NotFound;