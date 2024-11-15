import React from 'react';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <header id="growl-header">
            <section id="logo-and-name-container">
                <img src="img/growl_logo.png" alt="Growl logo"/>
                <h3><NavLink to={"/"} className={"btn btn-outline-primary"}>Growl</NavLink></h3>
            </section>
            <nav id="header-btn-container">
                <NavLink to={"/sign-in"} className={"header-btn"} id={"sign-in-btn"}>Sign in</NavLink>
                <NavLink to={"/login"} className={"header-btn"}>Login</NavLink>
            </nav>
        </header>
    );
};

export default Navbar;