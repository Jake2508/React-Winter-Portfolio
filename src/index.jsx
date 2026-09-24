// Core Extensions
// Must stay first: theme.js reads these off :root, and dev evaluates CSS in
// import order.
import './styles/tokens.css';
import './style.css';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';

// Custom Hooks & Components
import Experience from './components/Experience.jsx';
import Loader from './components/Loader.jsx'; 
import ProjectDisplay from './components/ProjectDisplay.jsx';
import usePreventZoom from './hooks/usePreventZoom.js';  
import usePreloadImages from './hooks/usePreloadImages.js';
import DebugPanel from './components/DebugPanel.jsx';
import SceneHUD from './components/SceneHUD.jsx';
import { profile } from './data/panelData.js';
import { timeline } from './data/aboutData.js';
import { cv } from './data/contactData.js';
import { projectData } from './data/projectData.js';
import { DPR_RANGE } from './utils/deviceProfile.js';
import { TITLE_DEFAULTS } from './components/SceneTitle.jsx';

// Every image the panel can show without scrolling or navigating. Warmed
// during the loading screen so nothing pops in once the panel opens. Built
// here rather than in panelData.js because it needs all three tabs' data
// files, and they import from panelData.js — building it there would make
// the imports circular.
const panelImages = [
    profile.portrait,
    cv.icon,
    ...timeline.map((item) => item.logo),
    ...projectData.map((project) => project.previewImage),
];


// Starting framing. A narrow fov flattens the near/far size difference so
// every island reads at the same scale — the diorama look. The debug panel
// seeds itself from this so the two cannot drift apart.
const CAMERA = { fov: 25, near: 1, far: 120, position: [19.82, 6.78, -7.06] };

// What OrbitControls looks at. Only the height is offset — the islands sit
// near y -1.4, so aiming at [0,0,0] points above the diorama's mass. x and z
// stay at 0 so the orbit pivots around the cabinet; fix any horizontal bias by
// rotating the camera's start position instead.
const ORBIT_TARGET = [0, -0.6, 0];

// The world-space "JAKE ROSE" sign. Off for now; the debug panel can preview it.
const SHOW_TITLE = false;

// Distance from ORBIT_TARGET above; ResponsiveCamera scales it for narrower
// windows. Derived so it cannot drift from CAMERA.
const BASE_RADIUS = Math.hypot(
    CAMERA.position[0] - ORBIT_TARGET[0],
    CAMERA.position[1] - ORBIT_TARGET[1],
    CAMERA.position[2] - ORBIT_TARGET[2],
);

// Scene tuning panel. Flip to true to bring it back while working on framing.
const SHOW_DEBUG_PANEL = false;

// Vite folds import.meta.env.DEV to a literal, so everything behind this leaves
// the prod bundle whatever the flag above says.
const DEBUG = import.meta.env.DEV && SHOW_DEBUG_PANEL;

const DEBUG_DEFAULTS = DEBUG ? {
    fov: CAMERA.fov,
    camX: CAMERA.position[0],
    camY: CAMERA.position[1],
    camZ: CAMERA.position[2],
    autoRotate: false,
    orbitEnabled: true,
    targetX: ORBIT_TARGET[0],
    targetY: ORBIT_TARGET[1],
    targetZ: ORBIT_TARGET[2],
    titleVisible: SHOW_TITLE,
    titleX: TITLE_DEFAULTS.anchor[0],
    titleY: TITLE_DEFAULTS.anchor[1],
    titleZ: TITLE_DEFAULTS.anchor[2],
    titleRise: TITLE_DEFAULTS.rise,
    titleSize: TITLE_DEFAULTS.size,
} : null;


const App = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false); 

    const [selectedProject, setSelectedProject] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [fadeInUI, setFadeInUI] = useState(false);

    // Which tab the panel should land on. Carries a nonce so clicking the same
    // nav item twice still re-targets it.
    const [requestedTab, setRequestedTab] = useState(null);

    // Dev-only scene tuning
    const [debug, setDebug] = useState(DEBUG_DEFAULTS);
    const cameraReadout = useRef({ x: 0, y: 0, z: 0, fov: 0, distance: 0 });

    // Restrict Zoom Controls
    usePreventZoom();

    // Warm the panel's images while the loading screen runs
    usePreloadImages(panelImages);

    const toggleVisibility = (project) => {
        if (project) {
            // Show Project Display
            setSelectedProject(project);
            setRequestedTab({ tab: project.tab ?? 'about', at: Date.now() });
            setIsVisible(true);
        } else {
            // Hide Project Display
            setIsVisible(false);
            setTimeout(() => setSelectedProject(null), 500); 
        }
    };

    // Top-right nav opens the panel straight onto a tab
    const openTab = (tab) => toggleVisibility({ title: 'Nav', tab });

    // Random load delay addition modifier — averages ~10ms so the 101 steps
    // land around 1s total, just enough for the hex-draw animation to read
    const randomDelay = () => Math.floor(Math.random() * 15) + 3;
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
                setTimeout(() => setFadeInUI(true), 100);
            }, 1000); 
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
                camera={CAMERA}
                gl={{ antialias: false, powerPreference: 'high-performance' }}
                dpr={DPR_RANGE} // Capped lower on handhelds — see utils/deviceProfile.js
            >
                <Suspense fallback={null}>
                    <Experience
                        onSelectProject={toggleVisibility}
                        isVisible={isVisible}
                        showTitle={!loading && fadeInUI && (DEBUG ? debug.titleVisible : SHOW_TITLE)}
                        orbitTarget={ORBIT_TARGET}
                        baseRadius={BASE_RADIUS}
                        debug={DEBUG ? debug : undefined}
                        cameraReadout={cameraReadout}
                    />
                </Suspense>
            </Canvas>

            {/* UI Overlay Wrapper */}
            <div className='ui-container'>
                <ProjectDisplay
                    isVisible={isVisible}
                    requestedTab={requestedTab}
                    onClose={() => toggleVisibility(null)}
                />
            </div>

            {/* Dev-only scene tuning panel */}
            {DEBUG && !loading && (
                <DebugPanel
                    settings={debug}
                    onChange={setDebug}
                    readout={cameraReadout}
                    defaults={DEBUG_DEFAULTS}
                />
            )}

            {/* Scene HUD — replaces the old corner labels */}
            {!loading && (
                <SceneHUD visible={fadeInUI && !isVisible} onNavigate={openTab} />
            )}
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