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
import usePreventZoom from './hooks/usePreventZoom.js';  


const MemorisedTitleDisplay = memo(TitleDisplay); 

const App = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false); 

    const [selectedProject, setSelectedProject] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [fadeInTitle, setFadeInTitle] = useState(false);

    // Restrict Zoom Controls
    usePreventZoom();

    const toggleVisibility = (project) => {
        if (project) {
            // Show Project Display
            setSelectedProject(project);
            setIsVisible(true);
        } else {
            // Hide Project Display
            setIsVisible(false);
            setTimeout(() => setSelectedProject(null), 500); 
        }
    };

    // Random load delay addition modifier  
    const randomDelay = () => Math.floor(Math.random() * 100) + 20;
    // Loading
    useEffect(() => {
        const loadAssets = async () => {
            for (let i = 0; i <= 100; i++) {
                const delay = randomDelay();
                await new Promise((resolve) => setTimeout(resolve, delay));
                setProgress(i);
            }

            // Load Complete - Fade Out
            setFadeOut(true); 
            setTimeout(() => {
                setLoading(false); 
                setTimeout(() => setFadeInTitle(true), 100);
            }, 1000); 
        };
        loadAssets();
    }, []);

    useEffect(() => {
        const updateViewportHeight = () => {
            // Calculate 1% of the viewport width/height
            const vw = window.innerWidth * 0.01;
            const vh = window.innerHeight * 0.01;

            // Update the CSS variable for the viewport
            document.documentElement.style.setProperty('--vw', `${vw}px`);
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        // Call function initially to set value
        updateViewportHeight();
        
        // Add Event listeners for resize and orientation
        window.addEventListener('resize', updateViewportHeight);
        window.addEventListener('orientationchange', updateViewportHeight); 

        return () => {
            window.removeEventListener('resize', updateViewportHeight);
            window.removeEventListener('orientationchange', updateViewportHeight);
        };
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
                camera={{ fov: 45, near: 1, far: 120, position: [15, 4.5, -7.5], }} 
                gl={{ antialias: false, powerPreference: 'high-performance' }}
                dpr={[1, Math.min(2, window.devicePixelRatio)]} // Cap max DPR to 2
            >
                <Suspense fallback={null}>
                    <Experience 
                        loadingComplete={!loading} 
                        onSelectProject={toggleVisibility} 
                        isVisible={isVisible} 
                    />
                </Suspense>
            </Canvas>

            {/* UI Overlay Wrapper */}
            <div className='ui-container'>
               {!loading && <MemorisedTitleDisplay fadeIn={fadeInTitle} />}
                <ProjectDisplay
                    project={selectedProject}
                    className={`fade-container ${isVisible ? 'visible' : ''}`} 
                    onClose={() => toggleVisibility(null)}             
                />
            </div>
        </>
    );
};

// Initialize DOM once
const container = document.querySelector('#root');
if (!container._rootInitialized) {
    const root = ReactDOM.createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
    container._rootInitialized = true;
}