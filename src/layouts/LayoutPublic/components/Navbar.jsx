import React from 'react';
import {NavLink} from "react-router-dom";
import "../../../css/header.css";

const Navbar = () => {
    return (
        <header id="growl-header">
            <section id="logo-and-name-container">
                <img src="../../src/assets/growl_logo.png" alt="Growl logo"/>
                <h3><NavLink to={"/"} className={"btn btn-outline-primary"}>Growl</NavLink></h3>
            </section>
            <nav id="header-btn-container">
                <NavLink to={"/signup"} className={"header-btn"} id={"sign-up-btn"}>Sign up</NavLink>
                <NavLink to={"/signin"} className={"header-btn"}>Sign in</NavLink>
            </nav>
        </header>
    );
};

export default Navbar;