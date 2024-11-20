import React from 'react';
import "../../../css/custom-alert.css"

const CustomAlert = ({ message, type, onClose }) => {
    return (
        <div className={`custom-alert ${type}`}>
            <h4>{type === 'error' ? 'Error!' : 'Success!'}</h4>
            <p>{message}</p>
            <button className="close-btn" onClick={onClose}>×</button>
        </div>
    );
};

export default CustomAlert;

