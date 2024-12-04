const FilterRequirementCheckboxes = ({ title, options, selectedOptions, onChange }) => {
    return (
        <div>
            <h4>{title}</h4>
            {options.map(option => (
                <label key={option.value}>
                    <input
                        type="checkbox"
                        checked={selectedOptions.includes(option.value)}
                        onChange={() => onChange(option.group, option.value)}
                    />
                    {option.label}
                </label>
            ))}
        </div>
    );
};

export default FilterRequirementCheckboxes;