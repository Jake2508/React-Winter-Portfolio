import React from 'react';
import "../styles/TitleDisplay.css";


// Main TitleDisplay Component
const TitleDisplay = ({ fadeIn }) => {
    return(    
            <img 
                src="/Images/Logo/site-title-logo.png" 
                alt="Jake Rose" 
                className={`title-image ${fadeIn ? 'fade-in' : ''}`} 
                tabIndex="-1"
            />
        );
};


export default TitleDisplay;