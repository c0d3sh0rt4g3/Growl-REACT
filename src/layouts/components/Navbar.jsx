import React, {useContext} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import "../../css/header.css";
import {UserContext} from "../../context/UserContext.jsx";
import {signOut} from "../../config/Firebase.jsx";

const Navbar = () => {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const handleSignOut = async () => {
        try {
            await signOut()
            setUser(null)
            localStorage.setItem("currentUser", "")
            navigate("/")
        } catch (error) {
            console.error(`Error logging out: ${error.message}`)
        }
    }

    const username = localStorage.getItem("currentUser")

    return (
        <header id="growl-header">
            <section id="logo-and-name-container">
                <img src="../../src/assets/growl_logo.png" alt="Growl logo"/>
                <h3><NavLink to={"/"} className={"btn btn-outline-primary"}>Growl</NavLink></h3>
            </section>
            <nav id="header-btn-container">
                {user ? (
                    <>
                        <NavLink to={"/profile"} id={"username"}>{JSON.parse(username).username || "User"}</NavLink>
                        <button onClick={handleSignOut} id={"sign-out-btn"} className={"header-btn"}>Sign out</button>
                    </>
                ) : (
                    <>
                        <NavLink to={"/signup"} className={"header-btn"} id={"sign-up-btn"}>Sign up</NavLink>
                        <NavLink to={"/signin"} className={"header-btn"}>Sign in</NavLink>
                    </>
                )}

            </nav>
        </header>
    );
};

export default Navbar;