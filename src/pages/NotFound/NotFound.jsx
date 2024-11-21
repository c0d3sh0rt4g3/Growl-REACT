import React from 'react';
import "../../css/404.css"
import {NavLink} from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <img id="rotating-knife" src="../../assets/knife.png" alt="Rotating knife"/>
            <main id="error-texts-container">
                <h1 id="error-type">404 Page Not Found</h1>
                <p>Sorry, but the page you were trying to view does not exist.</p>
                <NavLink to={"/"} id={"back-to-home-btn"}> Go back to the main page</NavLink>
            </main>
        </>
    );
};

export default NotFound;