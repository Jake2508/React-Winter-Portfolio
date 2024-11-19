import React from 'react';


// Main TitleDisplay Component
const TitleDisplay = ({ fadeIn }) => {
    return(    
        <div>
            <img 
                src="/Images/General/title.png" 
                alt="Jake Rose" 
                className={`title-image ${fadeIn ? 'fade-in' : ''}`}  // Use 'fade-in' to match the CSS
            />
        </div>
    );
};

export default TitleDisplay;
