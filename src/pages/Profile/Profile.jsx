import React, { useState } from 'react'
import "../../css/profile-page.css"
import BookmarkedFoodCard from "./components/BookmarkedFoodCard.jsx"
import { useNavigate } from "react-router-dom"
import { findUserIndexById } from "../../helpers/findUserIndexById.js"

// Import the fallback profile picture
import pfpImg from "../../assets/pfp.png"

const Profile = () => {
    // Use state for current user from localStorage
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("currentUser")))

    // Get users from DB from localStorage
    const usersFromDB = JSON.parse(localStorage.getItem("usersDB"))
    const navigate = useNavigate()

    // Navigate back to the search page
    const backToSearchPage = () => navigate("/search")

    // Remove a bookmark by its ID
    const removeBookmark = (bookmarkId) => {
        // Create a new updatedBookmarks array by filtering the bookmarkId
        const updatedBookmarks = user.bookmarks.filter(bookmark => bookmark.id !== bookmarkId)

        // Create a new updatedUser object with the updated bookmarks
        const updatedUser = { ...user, bookmarks: updatedBookmarks }

        // Update user in localStorage immediately
        localStorage.setItem("currentUser", JSON.stringify(updatedUser))

        // Update the users array in localStorage
        const userIndex = findUserIndexById(usersFromDB, user.id)
        if (userIndex !== -1) {
            // Update the user on the users list
            usersFromDB[userIndex] = updatedUser
            // Save usersDB to localStorage after modifying the current user
            localStorage.setItem("usersDB", JSON.stringify(usersFromDB))
        }

        // Update state to re-render the component with the updated user data
        setUser(updatedUser)
    }

    const navigateToEditProfile = () => {
        navigate("/profile/edit")
    }

    return (
        <main id="grid-wrapper">
            <aside id="user-data-column">
                <img
                    id="pfp"
                    src={user.pfpUrl ? user.pfpUrl : pfpImg}
                    alt="your profile picture"
                />
                <h3 id="email">{user.email}</h3>
                <p id="tags">{user.tags.length > 0 && user.tags.join(", ")}</p>
                <button className="user-btn" onClick={navigateToEditProfile}>Edit account details</button>
                <button className="user-btn" onClick={backToSearchPage}>Back to search page</button>
            </aside>
            <section id="bookmarked-foods-container">
                <h1 id="username">{user.username}</h1>
                {user.bookmarks.map(bookmarkedFood => (
                    <BookmarkedFoodCard
                        key={bookmarkedFood.id}
                        food={bookmarkedFood}
                        onDelete={removeBookmark}
                    />
                ))}
            </section>
        </main>
    )
}

export default Profile;
