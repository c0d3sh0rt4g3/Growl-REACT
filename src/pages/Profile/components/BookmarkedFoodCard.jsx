import React from 'react';
import deleteBookmarkImg from "../../../assets/deletebookmark.png"

const BookmarkedFoodCard = ({food}) => {
    return (
        <div className="bookmarked-food">
            {food.name}
            <img className="delete-bookmark-icon" src={deleteBookmarkImg} alt="Delete bookmark icon"/>
        </div>
    );
};

export default BookmarkedFoodCard;