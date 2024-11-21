import React from "react"

const InputField = ({
    id,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    onBlur,
    error
}) => {
    return (
        <div className="input-field">
            <input
                type={type}
                className={"form-textbox"}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
}

export default InputField
