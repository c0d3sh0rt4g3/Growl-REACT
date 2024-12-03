import React, { useState, useEffect } from 'react'
import "../../css/search-page.css"
import FoodCard from "./components/FoodCard.jsx"

const SearchPage = () => {
    const appId = import.meta.env.VITE_EDAMAM_APP_ID
    const appKey = import.meta.env.VITE_EDAMAM_APP_KEY

    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchQuery, setSearchQuery] = useState("salad")
    const [diet, setDiet] = useState([])
    const [health, setHealth] = useState([])
    const [mealType, setMealType] = useState([])
    // Next page URL
    const [nextPage, setNextPage] = useState(null)
    // Previous pages history
    const [prevPages, setPrevPages] = useState([])

    // Construye la URL dinámicamente
    const buildUrl = () => {
        let baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${appId}&app_key=${appKey}`

        if (diet.length > 0) baseUrl += `&diet=${diet.join(',')}` // Concatenar los elementos seleccionados de 'diet'
        if (health.length > 0) baseUrl += `&health=${health.join(',')}` // Concatenar los elementos seleccionados de 'health'
        if (mealType.length > 0) baseUrl += `&mealType=${mealType.join(',')}` // Concatenar los elementos seleccionados de 'mealType'

        return baseUrl
    }

    const fetchData = async (url, addToHistory = true) => {
        try {
            setLoading(true)
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            // Overwrite the results
            setResults(data.hits.map(hit => hit.recipe))

            // Updates the link to the next page
            setNextPage(data._links?.next?.href || null)

            // Adds the page to the pages history
            if (addToHistory) {
                setPrevPages(prev => [...prev, url])
            }

            setLoading(false)
        } catch (error) {
            console.error("Error fetching data:", error)
            setError(error.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        // Llama a la API solo si hay una consulta de búsqueda
        if (searchQuery) {
            const url = buildUrl()
            fetchData(url)
        }
    }, [searchQuery, diet, health, mealType]) // Ejecutar al cambiar filtros o la consulta

    const loadNextPage = () => {
        if (nextPage) {
            fetchData(nextPage)
            scrollToTop()
        }
    }

    const loadPreviousPage = () => {
        if (prevPages.length > 1) {
            // Get the previous url
            const previousPage = prevPages[prevPages.length - 2]

            // Deletes the url from the previous pages list
            setPrevPages(prev => prev.slice(0, -1))

            // Loads previous page without adding it to history
            fetchData(previousPage, false)

            scrollToTop()
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            console.log(e.target.value)
            setSearchQuery(e.target.value)
        }
    }

    const handleChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleFilterChange = (filterType, value) => {
        switch (filterType) {
            case "diet":
                setDiet((prevDiet) =>
                    prevDiet.includes(value)
                        ? prevDiet.filter(item => item !== value) // Remove if already selected
                        : [...prevDiet, value] // Add if not selected
                )
                break
            case "health":
                setHealth((prevHealth) =>
                    prevHealth.includes(value)
                        ? prevHealth.filter(item => item !== value) // Remove if already selected
                        : [...prevHealth, value] // Add if not selected
                )
                break
            case "mealType":
                setMealType((prevMealType) =>
                    prevMealType.includes(value)
                        ? prevMealType.filter(item => item !== value) // Remove if already selected
                        : [...prevMealType, value] // Add if not selected
                )
                break
            default:
                break
        }
    }

    return (
        <>
            <div id="searchbar-container" className="searchbar-with-dropdown">
                <input
                    id="recipe-searchbar"
                    type="text"
                    placeholder="Which recipe are you searching for?"
                    aria-label="Search bar"
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                />
                <div id="filters-container" className="dropdown">
                    <div className="dropdown-content">
                        <div>
                            <h4>Diet</h4>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={diet.includes("high-protein")}
                                    onChange={() => handleFilterChange("diet", "high-protein")}
                                />
                                High Protein
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={diet.includes("low-carb")}
                                    onChange={() => handleFilterChange("diet", "low-carb")}
                                />
                                Low Carb
                            </label>
                        </div>
                        <div>
                            <h4>Health</h4>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={health.includes("vegan")}
                                    onChange={() => handleFilterChange("health", "vegan")}
                                />
                                Vegan
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={health.includes("vegetarian")}
                                    onChange={() => handleFilterChange("health", "vegetarian")}
                                />
                                Vegetarian
                            </label>
                        </div>
                        <div>
                            <h4>Meal Type</h4>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={mealType.includes("breakfast")}
                                    onChange={() => handleFilterChange("mealType", "breakfast")}
                                />
                                Breakfast
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={mealType.includes("dinner")}
                                    onChange={() => handleFilterChange("mealType", "dinner")}
                                />
                                Dinner
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div id="search-results-container">
                {results.length > 0 ? (
                    <>
                        {results.map((food, index) => (
                            <FoodCard key={index} food={food}/>
                        ))}
                    </>
                ) : (
                    <div>No results found.</div>
                )}
            </div>
            <div id="pagination-buttons-container">
                <button onClick={loadPreviousPage} disabled={prevPages.length <= 1 || loading}>
                    Previous Page
                </button>
                {nextPage && (
                    <button onClick={loadNextPage} disabled={loading}>
                        {loading ? "Loading..." : "Next Page"}
                    </button>
                )}
            </div>
        </>
    )
}

export default SearchPage
