import React, { useContext, useEffect } from 'react'
import Navbar from "./components/Navbar.jsx"
import { Outlet, useNavigate } from "react-router-dom"
import Footer from "./components/Footer.jsx"
import { UserContext } from "../context/UserContext.jsx"

const LayoutPrivate = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, navigate])

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default LayoutPrivate
