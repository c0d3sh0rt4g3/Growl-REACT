import React, { useState, useEffect } from 'react'
import "../../css/search-page.css"
import FoodCard from "./components/FoodCard.jsx"
import FilterRequirementCheckboxes from "./components/FilterRequirementCheckboxes.jsx"
import {dietOptionsList, healthOptionsList} from "../../helpers/healthAndDietOptions.js";
import {getRecipeId} from "./helpers/getRecipeId.js";
import closeImg from "../../assets/close.png"

const SearchPage = () => {
    const appId = import.meta.env.VITE_EDAMAM_APP_ID
    const appKey = import.meta.env.VITE_EDAMAM_APP_KEY

    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)

    const [searchQuery, setSearchQuery] = useState("salad")
    const [diet, setDiet] = useState([])
    const [health, setHealth] = useState([])

    // Next page URL
    const [nextPage, setNextPage] = useState(null)
    // Previous pages history
    const [prevPages, setPrevPages] = useState([])

    const dietOptions = dietOptionsList
    const healthOptions = healthOptionsList

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    const buildUrl = () => {
        let baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${appId}&app_key=${appKey}`

        if (diet.length > 0) {
            diet.forEach(filter => {
                baseUrl += `&diet=${filter}`
            })
        }

        if (health.length > 0) {
            health.forEach(filter => {
                baseUrl += `&health=${filter}`
            })
        }

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
            setLoading(false)
        }
    }

    useEffect(() => {
        const url = buildUrl()
        // Do not add to history on initial search load
        fetchData(url)
        // Fetch data whenever the searchQuery changes
    }, [searchQuery])

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
        e.preventDefault()
    }

    const handleFilterChange = (filterType, value) => {
        switch (filterType) {
            case "diet":
                setDiet((prevDiet) =>
                    prevDiet.includes(value)
                        // Remove if already selected
                        ? prevDiet.filter(item => item !== value)
                        // Add if not selected
                        : [...prevDiet, value]
                )
                break
            case "health":
                setHealth((prevHealth) =>
                    prevHealth.includes(value)
                        // Remove if already selected
                        ? prevHealth.filter(item => item !== value)
                        // Add if not selected
                        : [...prevHealth, value]
                )
                break
            default:
                break
        }
    }

    const applyFilters = () => {
        const url = buildUrl()
        fetchData(url, false) // Prevent adding to history on filter apply
    }

    return (
        <>
            <div id="searchbar-container" className="searchbar">
                <input
                    id="recipe-searchbar"
                    type="text"
                    placeholder="Which recipe are you searching for?"
                    aria-label="Search bar"
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                />
                <button id="toggle-filters-button" onClick={toggleSidebar}>
                    Filters
                </button>
            </div>
            <div id="sidebar" className={isSidebarOpen ? "sidebar open" : "sidebar"}>
                <div className="sidebar-content">
                    <img className={"close-sidebar"} src={closeImg} alt={"Close"} onClick={toggleSidebar}/>
                    <h3>Filters</h3>
                    <FilterRequirementCheckboxes
                        title="Diet"
                        options={dietOptions}
                        selectedOptions={diet}
                        onChange={handleFilterChange}
                    />
                    <FilterRequirementCheckboxes
                        title="Health"
                        options={healthOptions}
                        selectedOptions={health}
                        onChange={handleFilterChange}
                    />
                    <button onClick={applyFilters}>Apply Filters</button>
                </div>
            </div>
            <div id="search-results-container">
                {results.length > 0 ? (
                    results.map(food => {
                        const foodId = getRecipeId(food);
                        return <FoodCard key={foodId} food={food} foodId={foodId} />;
                    })
                ) : (
                    <div>No results found.</div>
                )}
            </div>
            <div id="pagination-buttons-container">
                {prevPages.length > 1 && (
                    <button onClick={loadPreviousPage} disabled={loading}>
                        Previous Page
                    </button>
                )}
                {nextPage && (
                    <button onClick={loadNextPage} disabled={loading}>
                        {loading ? "Loading..." : "Next Page"}
                    </button>
                )}
            </div>
        </>
    );

}

export default SearchPage
