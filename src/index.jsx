import ReactDOM from 'react-dom/client';
import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';

import './style.css';
import Experience from './components/Experience.jsx';
import Loader from './components/Loader.jsx'; 


const root = ReactDOM.createRoot(document.querySelector('#root'));


const App = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false); 

    // Create slight load delays to force loading screen (don't want people on-site immediately) -- 20 ORIG
    const randomDelay = () => {
        return Math.random() < 0.0 ? Math.floor(Math.random() * 100) + 50 : 20; 
    };

    useEffect(() => {
        const loadAssets = async () => {
            for (let i = 0; i <= 100; i++) {
                const delay = randomDelay();
                await new Promise((resolve) => setTimeout(resolve, delay));
                setProgress(i);
            }

            // Loading complete, Begin fade out transition 
            setFadeOut(true); 
            
            // Hide Loader after fade
            setTimeout(() => {
                setLoading(false); 
            }, 1000); // Match this time to the duration of the fade-out
        };

        loadAssets();
    }, []);

    return (
        <>
            {loading && (
                <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
                    <Loader progress={progress} />
                </div>
            )}

            {/* Render HTML UI only when loading is complete */}
            {!loading && 
            (
                <div className="ui-overlay">
                    <img src="/Images/General/title.png" alt="Jake Rose" className="overlay-image" />
                </div>
            )}

            <Canvas 
                className='r3f'
                camera={{ fov: 45, near: 0.1, far: 2000, position: [15, 4.5, -7.5], }} 
            >
                <Suspense fallback={null}>
                    <Experience loadingComplete={!loading} />
                </Suspense>
            </Canvas>
        </>
    );
};

root.render(<App />);