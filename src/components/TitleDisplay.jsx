import React from 'react';
import "../styles/TitleDisplay.css";

// Main TitleDisplay Component
const TitleDisplay = ({ fadeIn }) => {
    return(    
        <div>
            <img 
                src="/Images/General/title.png" 
                alt="Jake Rose" 
                className={`title-image ${fadeIn ? 'fade-in' : ''}`} 
            />
        </div>
    );
};


export default TitleDisplay;