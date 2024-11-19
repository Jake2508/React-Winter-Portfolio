// Core Extensions
import React from 'react';


// Main ProjectDisplay Component
const TitleDisplay = ({ isVisible }) => {
    return(    
        <div>
            <img src="/Images/General/title.png" alt="Jake Rose" className={`title-image ${isVisible ? 'visible' : ''}`}  />
        </div>
    )
};


export default TitleDisplay;