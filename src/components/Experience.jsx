// Core Extensions
import { Stars, GradientTexture, Environment, useGLTF, OrbitControls } from '@react-three/drei';
import React, { useMemo, useState, useRef } from 'react';

// Post Processing Effects
import { Selection, Select, Outline, ToneMapping, EffectComposer, Vignette } from '@react-three/postprocessing';
import { ToneMappingMode, BlendFunction } from 'postprocessing';

// Custom Hooks & Components
import { useHover } from '../hooks/useHover.js'; 
import Interactable from './Interactable.js';

// Entities
import WinterEnvironment from '../entities/WinterEnvironment.js';

// Performance Monitoring
import { Perf } from 'r3f-perf';


export default function Experience({ onSelectProject, isVisible }) {
    
    // Static Scene
    const staticScene = useMemo(() => useGLTF('/Models/WinterScene.gltf'), []);

    // Effects, Hooks & Refs
    const [hovered, setHovered] = useState(false); 
    const orbitRef = useRef();


    const handleArcadeClick = () => {
        onSelectProject({
            title: 'Arcade Machine',
            description: 'Shows Project Display UI',
        });
    };

    // Memoize Environment
    const environment = useMemo(() => (
        <>
            <Environment preset="forest" />
            <GradientTexture 
                stops={[0, 0.3, 1]} 
                colors={['#001F3F', '#1B4F72', '#85C1E9']} 
                size={512} 
                attach="background" 
            />
        </>
    ), []);

        
    return (
        <>
            {/* Perf component monitors performance */}
            <Perf position="top-left" />

            {/* Environment, Lighting & Background */}
            {environment}
            <Stars 
                radius={5}
                depth={18} 
                count={2000} 
                factor={1.5} 
                saturation={0} 
                fade speed={0.75} 
            />

            <Selection>
                {/* Post Processing */}
                <EffectComposer multisampling={8} autoClear={false}>
                    <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />  
                    <Vignette offset={0.2} darkness={0.45} blendFunction={BlendFunction.COLOR_DODGE} />
                    <Outline visibleEdgeColor="white" edgeStrength={40} width={1000} />
                </EffectComposer>

                {/* Orbit Controls */}
                <OrbitControls makeDefault enableDamping={true} dampingFactor={0.1} enablePan={false} 
                    minPolarAngle={Math.PI / 4.5} maxPolarAngle={Math.PI / 2.2}
                    minDistance={7.0} maxDistance={25} 
                    enabled={!isVisible}  
                    autoRotate={true} autoRotateSpeed={0.2}
                    // Mobile Support
                    touches={{ 
                        ONE: 0, // Single-finger rotate
                        TWO: 2, // Two-finger zoom
                    }}
                />

                {/* Static Scene Objects */}
                <primitive object={staticScene.scene} scale={0.4} position-y={-1.4} castShadow={false} receiveShadow={false} />

                {/* Interactables */}
                <Select enabled={hovered}>
                    
                {/* Arcade Machine */}
                <Interactable modelName="ArcadeMachine" position-y={-1.4} castShadow={false} receiveShadow={false}
                onClick={handleArcadeClick}
                />

                </Select>
            </Selection>
        </>
    );
}