import React from 'react';
import "../css/404.css"

const NotFound = () => {
    return (
        <>
            <img id="rotating-knife" src="../assets/knife.png" alt="Rotating knife"/>
            <main id="error-texts-container">
                <h1 id="error-type">404 Page Not Found</h1>
                <p>Sorry, but the page you were trying to view does not exist.</p>
            </main>
        </>
    );
};

export default NotFound;