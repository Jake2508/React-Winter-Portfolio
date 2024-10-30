import React from "react";
import "react-loader-spinner"; // Ensure this import is correct
import { Blocks } from 'react-loader-spinner';


const Loader = ({ progress }) => {
    return (
        <div className="loading-screen">
            <h4 className='loading-text'>
                LOADING
                <br/>
                <img src="/Images/icons8-arcade-machine.png" alt="Loading Arcade Icon" className="arcade-icon" />

                <br />
                    [ {progress} / 100 ] 

            </h4>
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    );
};


export default Loader;
 