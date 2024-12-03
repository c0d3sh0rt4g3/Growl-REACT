import React, { useState, useEffect } from 'react'
import "../../css/search-page.css"
import FoodCard from "./components/FoodCard.jsx"

const SearchPage = () => {
    const appId = import.meta.env.VITE_EDAMAM_APP_ID
    const appKey = import.meta.env.VITE_EDAMAM_APP_KEY

    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [diet, setDiet] = useState("high-protein")
    // Next page URL
    const [nextPage, setNextPage] = useState(null)
    // Previous pages history
    const [prevPages, setPrevPages] = useState([])

    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${appId}&app_key=${appKey}&diet=${diet}`

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

    // UseEffect that fetchs data from the api qhen mounted and when the seacrh query changes
    useEffect(() => {
        if (searchQuery || searchQuery === "") {
            fetchData(url)
        }
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

    if (loading && results.length === 0) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            console.log(e.target.value)
            setSearchQuery(e.target.value) // Actualiza el searchQuery
        }
    }

    return (
        <>
            <div id="searchbar-container">
                <input id="recipe-searchbar" type="text" placeholder="Which recipe are you searching for?"
                       aria-label="Search bar" onKeyDown={handleKeyDown}/>
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
