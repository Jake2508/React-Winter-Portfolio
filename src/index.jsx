// Core Extensions
import './style.css';
import ReactDOM from 'react-dom/client';
import React, { memo } from 'react';
import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';

// Custom Hooks & Components
import Experience from './components/Experience.jsx';
import Loader from './components/Loader.jsx'; 
import TitleDisplay from './components/TitleDisplay.jsx';
import ProjectDisplay from './components/ProjectDisplay.jsx';


const root = ReactDOM.createRoot(document.querySelector('#root'));
const MemorisedTitleDisplay = memo(TitleDisplay); 

const App = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false); 

    const [selectedProject, setSelectedProject] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [fadeInTitle, setFadeInTitle] = useState(false);

    const toggleVisibility = (project) => {
        if (project) {
            // Project Display Show
            setSelectedProject(project);
            setIsVisible(true);
        } else {
            // Close the project display
            setIsVisible(false);
            setTimeout(() => setSelectedProject(null), 500); // Project Display Fade
        }
    };

    // Create slight load delays to force loading screen (don't want people on-site immediately) -- 20 ORIG
    const randomDelay = () => Math.floor(Math.random() * 100) + 20;

    useEffect(() => {
        const loadAssets = async () => {
            for (let i = 0; i <= 100; i++) {
                const delay = randomDelay();
                await new Promise((resolve) => setTimeout(resolve, delay));
                setProgress(i);
            }

            // Loading complete, Begin fade out transition 
            setFadeOut(true); 
            setTimeout(() => {
                setLoading(false); 
                setTimeout(() => setFadeInTitle(true), 100);
            }, 1000); // Fade Out
        };
        loadAssets();
    }, []);

    return (
        <>
            {/* Loading Screen UI */}
            {loading && (
                <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
                    <Loader progress={progress} />
                </div>
            )}

            {/* Main Canvas */}
            <Canvas 
                className='r3f'
                camera={{ fov: 45, near: 0.1, far: 150, position: [15, 4.5, -7.5], }} 
                gl={{ antialias: false, powerPreference: 'high-performance' }}
                dpr={[1, Math.min(2, window.devicePixelRatio)]} // Cap max DPR to 2
            >
                <Suspense fallback={null}>
                    <Experience loadingComplete={!loading} onSelectProject={toggleVisibility} />
                </Suspense>
            </Canvas>

            {/* UI Overlays */}
            <div className='ui-container'>
               {!loading && <MemorisedTitleDisplay fadeIn={fadeInTitle} />}
                <ProjectDisplay
                    project={selectedProject}
                    className={`fade-container ${isVisible ? 'visible' : ''}`} // Dynamically toggle visibility
                    onClose={() => toggleVisibility(null)} // Handle close button            
                />
            </div>
        </>
    );
};


root.render(<App />);