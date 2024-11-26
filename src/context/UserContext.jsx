import React, { createContext, useEffect, useState } from 'react'
import {auth, onAuthStateChange} from "../config/Firebase.jsx"

export const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChange(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
            } else {
                setUser(null)
            }
        })

        return () => unsubscribe()
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
