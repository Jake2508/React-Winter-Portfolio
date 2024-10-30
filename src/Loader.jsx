import React from "react";
import "react-loader-spinner"; // Ensure this import is correct
import { Blocks } from 'react-loader-spinner';


const Loader = ({ progress }) => {
    return (
        <div className="loading-screen">
            
            <h3 style={{ fontSize: '2.2rem', marginTop: '20px', textAlign: 'center' }}>
                <span style={{ minWidth: '50px', display: 'inline-block' }}>
                LOADING
                <br/>
                
                < Blocks height="100" width="100" ariaLabel="Loading"  />
                <br />
                    [{progress}/100] 
                </span>
            </h3>
        </div>
    );
};


export default Loader;
 