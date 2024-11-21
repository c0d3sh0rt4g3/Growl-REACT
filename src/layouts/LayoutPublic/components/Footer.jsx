import React from 'react';
import "../../../css/footer.css";
import {NavLink} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="contact-data-footer">
            <p>Contact us through: <NavLink to={"/contact-us"} id={"contact-us-btn"}>Contact form</NavLink></p>
        </footer>
    );
};

export default Footer;