import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import "../../css/recipe-page.css"
import IngredientsList from "./components/IngredientsList.jsx";
import NutritionionalValuesList from "./components/NutriniotalValuesList.jsx";
import RecipeTagsList from "./components/RecipeTagsList.jsx";

const Recipe = () => {
    const { foodId } = useParams(); // Extract foodId from URL params
    const appId = import.meta.env.VITE_EDAMAM_APP_ID; // Your App ID
    const appKey = import.meta.env.VITE_EDAMAM_APP_KEY; // Your App Key
    const [recipe, setRecipe] = useState(null); // State to hold the recipe data
    const [error, setError] = useState(null); // State to handle errors

    const fetchData = async () => {
        try {
            // Construct the API URL
            const url = `https://api.edamam.com/api/recipes/v2/${foodId}?type=public&app_id=${appId}&app_key=${appKey}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setRecipe(data.recipe);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to fetch the recipe. Please try again.");
        }
    };

    // Fetch data when the component mounts or when foodId changes
    useEffect(() => {
        if (foodId) {
            fetchData();
        }
    }, [foodId]);

    // Show a loading message, error, or recipe details
    if (error) {
        return <p>{error}</p>;
    }

    if (!recipe) {
        return <p>Loading...</p>;
    }

    return (
        <main id="grid-wrapper">
            <aside id="food-photo-container">
                <img id="food-photo" src={recipe.image} alt="BBQ Beef Brisket"/>
                <button className="food-btn">Bookmark</button>
                <button className="food-btn">Searchpage</button>
            </aside>
            <section id="ingredients-container">
                <h1 id="food-name">{recipe.label}</h1>
                <article id="ingredients">
                    <h3>Ingredients:</h3>
                    <IngredientsList ingredients={recipe.ingredients}/>
                </article>
                <article id="nutritional-values-and-tags">
                    <h3>Nutritional values:</h3>
                    <NutritionionalValuesList
                        calories={recipe.calories}
                        servings={recipe.yield}
                        dailyEnergyValue={recipe.totalDaily.ENERC_KCAL.quantity}
                    />
                    <h3>Tags:</h3>
                    <RecipeTagsList healthLabels={recipe.healthLabels} dietLabels={recipe.dietLabels}/>
                </article>
            </section>
        </main>
    );
};

export default Recipe;
