import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import "../../css/recipe-page.css"
import IngredientsList from "./components/IngredientsList.jsx"
import NutritionionalValuesList from "./components/NutriniotalValuesList.jsx"
import RecipeTagsList from "./components/RecipeTagsList.jsx"

const Recipe = () => {
    // Extract foodId from URL params
    const { foodId } = useParams()

    const appId = import.meta.env.VITE_EDAMAM_APP_ID
    const appKey = import.meta.env.VITE_EDAMAM_APP_KEY

    // State to hold the recipe data
    const [recipe, setRecipe] = useState(null)
    // State to handle errors
    const [error, setError] = useState(null)
    const [bookmarked, setBookmarked] = useState(false)

    const navigate = useNavigate()

    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const usersFromDB = JSON.parse(localStorage.getItem("usersDB"))

    useEffect(() => {
        // Fetch recipe data from API
        const fetchData = async () => {
            try {
                // Construct the API URL
                const url = `https://api.edamam.com/api/recipes/v2/${foodId}?type=public&app_id=${appId}&app_key=${appKey}`
                const response = await fetch(url)

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json()
                setRecipe(data.recipe)
            } catch (error) {
                console.error("Error fetching data:", error)
                setError("Failed to fetch the recipe. Please try again.")
            }
        }

        fetchData()
    }, [foodId, appId, appKey])

    useEffect(() => {
        // Checks if the recipe is already on bookmarks
        const checkIfBookmarked = () => {
            if (currentUser?.bookmarks) {
                const isBookmarked = currentUser.bookmarks.some(bookmarked => bookmarked.id === foodId)
                setBookmarked(isBookmarked)
            }
        }

        checkIfBookmarked()
    }, [foodId, currentUser])

    const addToBookmarks = (e) => {
        e.stopPropagation()

        if (!bookmarked) {
            const bookmarkedFood = {
                id: foodId,
                name: recipe.label
            }

            currentUser.bookmarks.push(bookmarkedFood)

            // We find the index where currentUser is located
            const userIndex = usersFromDB.findIndex(user => user.id === currentUser.id)

            if (userIndex !== -1) {
                // Update the user on the users list
                usersFromDB[userIndex] = currentUser
                // Save on local storage
                localStorage.setItem("currentUser", JSON.stringify(currentUser))
                localStorage.setItem("usersDB", JSON.stringify(usersFromDB))
                setBookmarked(true) // Update bookmarked state after adding
            }
        }
    }

    // Show a loading message, error, or recipe details
    if (error) {
        return <p>{error}</p>
    }

    if (!recipe) {
        return <p>Loading...</p>
    }

    const travelToSearchPage = () => {
        navigate(`/search`)
    }

    return (
        <main id="grid-wrapper">
            <aside id="food-photo-container">
                <img id="food-photo" src={recipe.image} alt={recipe.label} />
                <button className="food-btn" onClick={addToBookmarks}>
                    {bookmarked ? "Already bookmarked" : "Bookmark"}
                </button>
                <button className="food-btn" onClick={travelToSearchPage}>Searchpage</button>
            </aside>
            <section id="ingredients-container">
                <h1 id="food-name">{recipe.label}</h1>
                <article id="ingredients">
                    <h3>Ingredients:</h3>
                    <IngredientsList ingredients={recipe.ingredients} />
                </article>
                <article id="nutritional-values-and-tags">
                    <h3>Nutritional values:</h3>
                    <NutritionionalValuesList
                        calories={recipe.calories}
                        servings={recipe.yield}
                        dailyEnergyValue={recipe.totalDaily.ENERC_KCAL.quantity}
                    />
                    <h3>Tags:</h3>
                    <RecipeTagsList healthLabels={recipe.healthLabels} dietLabels={recipe.dietLabels} />
                </article>
            </section>
        </main>
    )
}

export default Recipe
