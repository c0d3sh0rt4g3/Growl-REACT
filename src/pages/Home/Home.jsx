import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import "../../css/home.css"
import {UserContext} from "../../context/UserContext.jsx";

const Home = () => {
    const { user } = useContext(UserContext)
    const navLink = user ? "/search" : "/signin"
    return (
        <main id="welcoming-texts-container">
            <h1 id="welcome-text-header">Welcome to Growl</h1>
            <p id="welcome-text-body">Getting recipes that fit your needs have never been easier</p>
            <NavLink to = {navLink}>Start searching</NavLink>
        </main>
    );
};

export default Home;