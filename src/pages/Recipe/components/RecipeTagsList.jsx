import React from 'react';

const RecipeTagsList = ({ healthLabels, dietLabels }) => {
    // Combine both healthLabels and dietLabels into one array
    const allTags = [...healthLabels, ...dietLabels];

    return (
        <p>
            {allTags.join(', ')}
        </p>
    )
};

export default RecipeTagsList;
