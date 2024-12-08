import React from 'react';
import deleteBookmarkImg from "../../../assets/deletebookmark.png";
import { useNavigate } from "react-router-dom";

const BookmarkedFoodCard = ({ food, onDelete }) => {
    const navigate = useNavigate();

    // Navigate to the recipe details page
    const navigateToRecipe = () => navigate(`/search/recipe/${food.id}`);

    // Handle the bookmark deletion
    const deleteFromBookmarks = (e) => {
        e.stopPropagation(); // Prevent triggering the click event on the card
        onDelete(food.id); // Call the parent function to handle the deletion
    };

    return (
        <div className="bookmarked-food" onClick={navigateToRecipe}>
            {food.name}
            <img
                className="delete-bookmark-icon"
                src={deleteBookmarkImg}
                alt="Delete bookmark icon"
                onClick={deleteFromBookmarks}
            />
        </div>
    );
};

export default BookmarkedFoodCard;
