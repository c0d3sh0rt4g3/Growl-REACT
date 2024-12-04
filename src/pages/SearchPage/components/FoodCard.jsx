import React from 'react'
import bookmarkIcon from '../../../assets/bookmark.png'

const FoodCard = ({food, foodId}) => {
    const isBookmarked = (bookmarks) => bookmarks.some(bookmarked => bookmarked.id === foodId)

    const addToBookmarks = () => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"))
        const usersFromDB = JSON.parse(localStorage.getItem("usersDB"))

        if (!isBookmarked(currentUser.bookmarks)) {
            const bookmarkedFood = {
                id: foodId,
                name: food.label
            }

            currentUser.bookmarks.push(bookmarkedFood)

            // We find the index where currentUser is located
            const userIndex = usersFromDB.findIndex(user => user.id === currentUser.id)

            if (userIndex !== -1) {
                // Update the user on the users list
                usersFromDB[userIndex] = currentUser
                console.log("qa")
                // Save on local storage
                localStorage.setItem("currentUser", JSON.stringify(currentUser))
                localStorage.setItem("usersDB", JSON.stringify(usersFromDB))
            }
        }
    }
    const calories = food.calories.toFixed(2)
    return (
        <div className="search-result">
            <img src={food.image} alt="Result food"/>
            <section>
                <h4>{food.label}</h4>
                <p>{calories} CALORIES</p>
                <div id={"bookmark-contgainer"} onClick={addToBookmarks}>
                    <img id={"bookmark-img"} src={bookmarkIcon} alt="Bookmark"/>
                </div>
            </section>
        </div>
    )
}

export default FoodCard