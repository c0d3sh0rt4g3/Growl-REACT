import React from 'react';

const IngredientsList = ({ ingredients }) => {
    return (
        <ul>
            {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.text}</li>
            ))}
        </ul>
    );
};

export default IngredientsList;