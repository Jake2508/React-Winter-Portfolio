// Core Extensions
import './style.css';
import ReactDOM from 'react-dom/client';
import React, { memo, useRef, useState, useEffect } from 'react';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

// Custom Hooks & Components
import Experience from './components/Experience.jsx';
import ProjectDisplay from './components/ProjectDisplay.jsx';
import usePreventZoom from './hooks/usePreventZoom.js';  


const App = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false); 
    const [selectedProject, setSelectedProject] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    const [fadeInTitle, setFadeInTitle] = useState(false);

    // Reference for the Canvas element
    const canvasRef = useRef(null);

    // Restrict Zoom Controls
    usePreventZoom();

    const toggleVisibility = (project) => {
        if (project) {
            setSelectedProject(project);
            setIsFocused(true);
        } else {
            setIsFocused(false);
            setTimeout(() => setSelectedProject(null), 500); 
        }
    };

    // Random load delay addition modifier  
    const randomDelay = () => Math.floor(Math.random() * 100) + 20;

    // Loading assets
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

    // Resize canvas on window resize
    useEffect(() => {
        const resizeCanvas = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };

        // // Initial resize
        resizeCanvas();

        // // Resize canvas on window resize
        window.addEventListener('resize', resizeCanvas);

        // // Cleanup listener on component unmount
        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    return (
        <>
            {/* Main Canvas */}
            <Canvas
                ref={canvasRef}  // Attach the ref to the Canvas element
                className='r3f'
                gl={{ antialias: false, powerPreference: 'high-performance' }}
                dpr={[1, Math.min(2, window.devicePixelRatio)]} // Cap max DPR to 2
            >
                <Suspense fallback={null}>
                    <Experience 
                        loadingComplete={!loading} 
                        onSelectProject={toggleVisibility} 
                        isVisible={isFocused} 
                    />
                </Suspense>
            </Canvas>

            {/* UI Overlay Wrapper */} 
            <div className='ui-container'>
                <ProjectDisplay
                    project={selectedProject}
                    className={`fade-container ${isFocused ? 'visible' : ''}`} 
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