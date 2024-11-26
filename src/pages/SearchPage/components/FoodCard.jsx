import React from 'react';

const FoodCard = ({food}) => {
    return (
        <div className="search-result">
            <img src={food.image} alt="Result food"/>
            <section>
                <h4>{food.label}</h4>
                <p>{food.calories} CALORIES</p>
            </section>
        </div>
    );
};

export default FoodCard;