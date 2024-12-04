import React from 'react';
import {useParams} from "react-router-dom";

const Recipe = () => {
    const { foodId } = useParams();
    const fetchData = async () => {
        try {
            setLoading(true)
            const url = `https://api.edamam.com/api/recipes/v2/${foodId}?type=public&app_id=${appId}&app_key=${appKey}`
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            // Overwrite the results
            setResults(data.hits.map(hit => hit.recipe))

        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }
    return (
        <>
            <h3>Recipe page</h3>
        </>
    );
};

export default Recipe;