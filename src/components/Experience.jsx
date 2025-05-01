// Core Extensions
import { Text, Float, Stars, GradientTexture, Environment, useGLTF, OrbitControls } from '@react-three/drei';
import React, { useMemo, useRef } from 'react';


// Post Processing Effects
import { ToneMapping, EffectComposer, Vignette } from '@react-three/postprocessing';
import { ToneMappingMode, BlendFunction } from 'postprocessing';

// Custom Hooks & Components
import { useHover } from '../hooks/useHover.js'; 
import OptimiseModel from '../hooks/useOptimiseModel.js';
import { useState, useEffect } from 'react';
import CameraController from './CameraController';
import { useCameraLogic } from '../hooks/useCameraLogic';

// Performance Monitoring
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';


export default function Experience({ onSelectProject, isVisible }) {

    const staticScene = useMemo(() => useGLTF('/Models/WinterScene.gltf'), []);
    const arcadeMachine = useMemo(() => useGLTF('/Models/ArcadeMachine.gltf'), []);
    const signPost = useMemo(() => useGLTF('/Models/SignPost.gltf'), []);
    
        posZ: { value: 2.4, min: -10, max: 10, step: 0.1 },
        rotX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
        rotY: { value: 2.28, min: -Math.PI, max: Math.PI, step: 0.01 },
        rotZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    });

    // Setup Camera
    const [cameraState, setCameraState] = useState('intro');
    const orbitRef = useRef();
    useCameraLogic({ cameraState, setCameraState, isVisible });

    // Hover Effect Hook
    const { handlePointerOver, handlePointerOut, hoveredObject } = useHover(); 

    const handleArcadeClick = () => {
        if (cameraState === 'focusArcade') return;
        
        console.log(cameraState);
        setCameraState('focusArcade');
        onSelectProject({
            title: 'Arcade Machine',
            description: 'Shows Project Display UI',
        });
    };

    const isFocused = cameraState === 'focusArcade';
    const floatConfig = {
        rotationIntensity: isFocused ? 0.05 : 0.2, // subtle when focused
        floatIntensity: isFocused ? 0.1 : 0.25,     // less bobbing when focused
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

    const postProcessingEffects = useMemo(() => {
        return (
            <EffectComposer multisampling={2} >
                <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />  
                <Vignette offset={0.2} darkness={0.45} blendFunction={BlendFunction.COLOR_DODGE} />
            </EffectComposer>
            );
        }, []); // Only recalculated once
        
    return (
        <>
            {/* Perf component monitors performance */}
            <Perf position="top-left" />

            {/* Environment, Lighting & Background */}
            {environment}
            <Stars 
                radius={5}
                depth={18} 
                count={1000} 
                factor={1.5} 
                saturation={0} 
                fade speed={0.75} 
            />

            {/* Post Processing */}
            {postProcessingEffects}

            {/* Camera Setup */}
            <CameraController cameraState={cameraState} setCameraState={setCameraState} orbitRef={orbitRef} />

            {/* Orbit Controls */}
            <OrbitControls ref={orbitRef} 
                makeDefault enableDamping={true} dampingFactor={0.05} enablePan={false} 
                minPolarAngle={Math.PI / 4.5} maxPolarAngle={Math.PI / 2.2}
                minDistance={7.0} maxDistance={25} 
                autoRotate={true} autoRotateSpeed={0.2} 
                enabled={cameraState === 'orbit'} 
                
                // Mobile Support
                touches={{ 
                    ONE: 0, // Single-finger rotate
                    TWO: 2, // Two-finger zoom
                  }}
            />


            {/* Scene Objects */}
            <Float 
                rotationIntensity={floatConfig.rotationIntensity}
                floatIntensity={floatConfig.floatIntensity}
                speed={1}
            >
                {/* Model Shit */}
                            {/* Static Scene Objects */}
            
                {/* <WinterEnvironment /> */}
                <primitive 
                    object={staticScene.scene} scale={0.4} position-y={-1.4} castShadow={false} receiveShadow={false} 
                />
                {/* Arcade Machine */}
                <primitive 
                    object={arcadeMachine.scene} scale={0.4} position-y={-1.4} castShadow={false} receiveShadow={false} 
                    onPointerOver={(event) => handlePointerOver(event, arcadeMachine.scene)} 
                    onPointerOut={(event) => handlePointerOut(event, arcadeMachine.scene)}
                    onClick={handleArcadeClick}
                />
                {/* Sign Post */}
                <primitive 
                    object={signPost.scene} scale={0.4} position-y={-1.4} castShadow={false} receiveShadow={false} 
                    onPointerOver={(event) => handlePointerOver(event, signPost.scene)} 
                    onPointerOut={(event) => handlePointerOut(event, signPost.scene)}
                    onClick={handleArcadeClick}
                />
                <Text
                    fontSize={0.2}
                    
                    position={ [posX, posY, posZ]}
                    rotation={ [rotX, rotY, rotZ]}
                    // rotation-y={ 0 }
                    // rotation-z={ 2.64 }

                    maxWidth={ 2 }
                    textAlign='center'
                    color={'black'}
                >
                    JAKE ROSE
                </Text>
            </Float>
        </>
    );
}