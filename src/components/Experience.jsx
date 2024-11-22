// Core Extensions
import { Stars, GradientTexture, Environment, useGLTF, OrbitControls } from '@react-three/drei';
import React, { useMemo } from 'react';

// Post Processing Effects
import { ToneMapping, EffectComposer, DepthOfField, Vignette } from '@react-three/postprocessing';
import { ToneMappingMode, BlendFunction } from 'postprocessing';

// Custom Hooks & Components
import { useHover } from '../hooks/useHover.js'; 

// Entities
import WinterEnvironment from '../entities/WinterEnvironment.js';

// Performance Monitoring
import { Perf } from 'r3f-perf';


export default function Experience({ onSelectProject, isVisible }) {
    // Setup Model
    const arcadeMachine = useMemo(() => useGLTF('/Models/ArcadeMachine.gltf'), []);

    // Hover Effect Hook
    const { handlePointerOver, handlePointerOut, hoveredObject } = useHover(); 

    const handleArcadeClick = () => {
        onSelectProject({
            title: 'Arcade Machine',
            description: 'Shows Project Display UI',
        });
    };

    // Memoize Environment, Lighting & Post-Processing effects to render once (Static Scene)
    const environment = useMemo(() => (
        <>
            <Environment preset="forest" />
            <GradientTexture 
                stops={[0, 0.3, 1]} 
                colors={['#001F3F', '#1B4F72', '#85C1E9']} 
                size={512} 
                attach="background" 
            />
            <ambientLight 
                intensity={0.3} 
                color={'#ffffff'} 
                castShadow={false} 
            />
        </>
    ), []);

    const postProcessingEffects = useMemo(() => {
        return (
            <EffectComposer>
                <ToneMapping mode={ToneMappingMode.ACES_FILMIC} /> 
                <Vignette offset={0.2} darkness={0.45} blendFunction={BlendFunction.COLOR_DODGE} />
            </EffectComposer>
            );
        }, []); // Only recalculated once

    return (
        <>
            {/* Perf component monitors performance */}
            {/* <Perf position="top-left" /> */}

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

            {/* Post Processing */}
            {postProcessingEffects}

            {/* Orbit Controls */}
            <OrbitControls makeDefault enableDamping={true} dampingFactor={0.05} enablePan={false} 
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
            <WinterEnvironment />

            {/* Arcade Machine */}
            <primitive 
                object={arcadeMachine.scene} scale={0.4} position-y={-1.4} 
                castShadow={false} receiveShadow={false} 
                onPointerOver={(event) => handlePointerOver(event, arcadeMachine.scene)} 
                onPointerOut={(event) => handlePointerOut(event, arcadeMachine.scene)}
                onClick={handleArcadeClick}
            />
        </>
    );
}