import React from 'react';

const RecipeTagsList = ({ healthLabels, dietLabels }) => {
    // Combine both healthLabels and dietLabels into one array
    const allTags = [...healthLabels, ...dietLabels];

    return (
        <div>
            <p>{allTags.join(', ')}</p>
        </div>
    );
};

export default RecipeTagsList;
