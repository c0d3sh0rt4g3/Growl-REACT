import React from 'react';

const FoodCard = ({food}) => {
    const calories = food.calories.toFixed(2)
    return (
        <div className="search-result">
            <img src={food.image} alt="Result food"/>
            <section>
                <h4>{food.label}</h4>
                <p>{calories} CALORIES</p>
            </section>
        </div>
    );
};

export default FoodCard;