import React, { useState, useEffect } from 'react';
import "../../css/search-page.css"
import FoodCard from "./components/FoodCard.jsx";

const SearchPage = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const callAPI = async () => {
            try {
                const query = "";
                const diet = "high-protein";
                const appId = import.meta.env.VITE_EDAMAM_APP_ID;
                const appKey = import.meta.env.VITE_EDAMAM_APP_KEY;

                const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appId}&app_key=${appKey}&diet=${diet}`;
                console.log("Fetching data from:", url);

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setResults(data.hits.map(hit => hit.recipe));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
                setLoading(false);
            }
        };
        callAPI()
    }, []); // Empty dependency array means this runs only on component mount

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div id="search-results-container">
            {results.length > 0 ? (
                results.map((food, index) => (
                    <FoodCard key={index} food={food} />
                ))
            ) : (
                <div>No results found.</div>
            )}
        </div>
    );
};

export default SearchPage;
