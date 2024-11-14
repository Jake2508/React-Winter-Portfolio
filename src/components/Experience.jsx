// Core Extensions
import { useAnimations, PivotControls, Stars, GradientTexture, Environment, useGLTF, OrbitControls, Float, Html, Sparkles} from '@react-three/drei';
import { useRef, useState } from 'react';

// Post Processing Effects
import { ToneMapping, EffectComposer, DepthOfField, Bloom, Vignette } from '@react-three/postprocessing';
import { ToneMappingMode, BlendFunction } from 'postprocessing';

// Custom Hooks & Components
import { useHover } from '../hooks/useHover.js'; 
import ProjectDisplay from './ProjectDisplay.jsx';

// Entities
import Rings from '../entities/Rings.js';
import Floor from '../entities/Floor.js';
import Trees from '../entities/Trees.js';
import Rocks from '../entities/Rocks.js';
import Tools from '../entities/Tools.js';

// Performance Monitoring
import { Perf } from 'r3f-perf';


export default function Experience() {
    // Setup Models
    const arcadeMachine = useGLTF('/Models/ArcadeMachine-v4.gltf');
    const machineSwitch = useGLTF('/Models/switch.gltf');
    const cable = useGLTF('/Models/cable.gltf');
    const box = useGLTF('/Models/Box.gltf');
    const stereo = useGLTF('/Models/Stereo.gltf');
    const planet = useGLTF('/Models/PlanetTest.gltf');

    // Hover colour effect hook
    const { handlePointerOver, handlePointerOut, hoveredObject } = useHover(); 


    // State for Project Display
    const [selectedProject, setSelectedProject] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRenderVisible, setShouldRenderVisible] = useState(false);
    
    // Define empty obj for click events 
    const projects = {
        arcadeMachine: {},
        box: {}
    };

    // Event Handler for clicking the Arcade Machine
    const eventHandler = (project) => (event) => 
    {
        event.stopPropagation();
        if (isVisible) {
            // Fade-out logic
            setIsVisible(false);
            setTimeout(() => {
                setSelectedProject(null); // Delay resetting active project until fade-out finishes
            }, 500); // Transition duration (match css)
        } else {
            // Fade-in logic
            setSelectedProject(project);
            setIsVisible(true);
            // Delay applying the `visible` class for smooth fade-in
            setTimeout(() => {
                setShouldRenderVisible(true);
            }, 20); // Tiny delay to allow initial render
        }
    };

    // State to control PivotControls visibility
    const [attach, setAttach] = useState(false); 
    const boxRef = useRef();

    // Toggle visibility function for PivotControls
    const handleBoxClick = (event) => 
    {
        event.stopPropagation();
        setAttach(prev => !prev); // Toggle attach state
        console.log("Box clicked, toggling PivotControls. Current state:", !attach);
    };

    const handleMusicClick = (event) =>
    {
        // Play a music note animation 

        // Maybe add actual music later
    };


    return (
        <>
            {/* Perf component monitors performance */}
            {/* <Perf position="top-left" /> */}

            {/* Background & Environment */}
            <Environment preset="forest" />
            <GradientTexture stops={[0, 0.3, 1]} colors={['#001F3F', '#1B4F72', '#85C1E9']} size={1024} attach="background" />
            <Stars radius={40} depth={50} count={5000} factor={4} saturation={0} fade speed={0.75} />

            {/* Lighting */}
            <directionalLight position={[2, 3, 10]} intensity={0.65} color={"#f0e68c"} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.002} />
            <ambientLight intensity={0.3} color={'#ffffff'} /> 

            {/* Post Processing */}
            <EffectComposer>
                <ToneMapping mode={ToneMappingMode.ACES_FILMIC} /> 
                <Vignette offset={0.3} darkness={0.85} blendFunction={BlendFunction.COLOR_DODGE} />
                <Bloom mipmapBlur intensity={0.1} luminanceThreshold={0.8} />
                <DepthOfField focusDistance={0.015} focalLength={0.025} bokehScale={0.5} />
            </EffectComposer>

            <OrbitControls makeDefault enableDamping={true} dampingFactor={0.05} enablePan={false} minPolarAngle={Math.PI / 4.5} maxPolarAngle={Math.PI / 2.2}
                minDistance={7.0} maxDistance={25} enabled={!isVisible}  
                // autoRotate={true} autoRotateSpeed={0.35} - TO ENABLE LATER
            />

            {/* Scene Objects */}
            <Floor />
            <Trees />
            <Rocks />
            <Tools />

            {/* Rings Animation - Adding to Scene */}
            {/* <Rings /> */}
            

            {/* Arcade Machine */}
            <primitive object={arcadeMachine.scene} scale={0.4} position-y={-1.4} castShadow receiveShadow
                onPointerOver={(event) => handlePointerOver(event, arcadeMachine.scene)} 
                onPointerOut={(event) => handlePointerOut(event, arcadeMachine.scene)}
                onClick={eventHandler(projects.arcadeMachine)} 
            />

            {/* Switch and Cable */}
            <primitive object={machineSwitch.scene} scale={0.4} position-y={-1.4} />
            <primitive object={cable.scene} scale={0.4} position-y={-1.4} />

            {/* Stereo + Floating Effect */}
            {/* <Float speed={3} rotationIntensity={0.1} floatingAmplitude={0.05} floatingRange={[0.2, 0.3]} >
                <primitive object={stereo.scene} scale={0.4} position-y={-1.4} 
                    onPointerOver={(event) => handlePointerOver(event, stereo.scene)} 
                    onPointerOut={(event) => handlePointerOut(event, stereo.scene)}
                    onClick={() => { }} 
                />
            </Float> */}

            {/* Box with Pivot Controls */}
            {/* <PivotControls object={boxRef.current} visible={attach} rotation={[0, -Math.PI / -0.5, 0]} depthTest={true} lineWidth={4.5} anchor={[-0.5, 1.5, -0.5]} disableScaling={true}>
                <primitive object={box.scene} ref={boxRef} scale={0.4} position-y={-1.4} position-z={-0.2}
                onPointerOver={(event) => handlePointerOver(event, box.scene)} 
                onPointerOut={(event) => handlePointerOut(event, box.scene)}
                onClick={handleBoxClick} 
                />
            </PivotControls> */}

            {/* <Sparkles count={500} speed={1} opacity={0.5} color={'green'} size={5} scale={-2} noise={5} /> */}
            
            
            {/* Display UI Sections from Arcade Machine selection */}
            {selectedProject && (<Html className={`fade-container ${shouldRenderVisible ? 'visible' : ''}`}>
                <ProjectDisplay project={selectedProject} 
                onClose={() => { 
                setIsVisible(false);
                setShouldRenderVisible(false);
                setTimeout(() => setSelectedProject(null), 750); 
                }}
                />
            </Html>)}
        </>
    );
}
