import React from 'react';

const NutritionionalValuesList = ({ calories, servings, dailyEnergyValue }) => {
    const caloriesPerServing = (calories / servings).toFixed(2)
    return (
        <ul>
            <li>Calories per serving: {caloriesPerServing}</li>
            <li>Servings: {servings}</li>
            <p>Daily energy value: {dailyEnergyValue.toFixed(2)} % </p>
        </ul>
    );
};

export default NutritionionalValuesList;
