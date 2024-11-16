// Core Extensions
import React from "react";
import "react-loader-spinner"; 


const Loader = ({ progress }) => {
    return (
        <div className="loading-screen">
            {/* Default Text */}
            <h4 className='loading-text'>
                LOADING
                <br/>
                {/* Loading Icon */}
                <img src="/Images/General/icons8-arcade-machine.png" alt="Loading Arcade Icon" className="arcade-icon" />

                <br />
                {/* Loading Percentage */}
                [ {progress} / 100 ] 

            </h4>
            {/* Progress Bar */}
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    );
};


export default Loader;