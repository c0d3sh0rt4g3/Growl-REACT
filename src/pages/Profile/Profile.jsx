import React from 'react';
import "../../css/profile-page.css"
import BookmarkedFoodCard from "./components/BookmarkedFoodCard.jsx";
import pfpImg from "../../assets/pfp.png"

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    return (
        <main id="grid-wrapper">
            <aside id="user-data-column">
                <img id="pfp" src={pfpImg} alt="your profile picture"/>
                <h3 id="email">{user.email}</h3>
                <p id="tags">tag1, tag2, tag3, tag4, tag5, tag6</p>
                <button className="user-btn">Edit account details</button>
                <button className="user-btn">Back to search page</button>
            </aside>
            <section id="bookmarked-foods-container">
                <h1 id="username">{user.username}</h1>
                {user.bookmarks.map(bookmarkedFood => (
                    <BookmarkedFoodCard key={bookmarkedFood.id} food={bookmarkedFood} />
                ))}
            </section>
        </main>
    );
};

export default Profile;