// Core Extensions
import React, { useMemo, useRef, useState } from 'react';
import { Text, Float, Stars, GradientTexture, Environment, useGLTF, OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber'

// Post Processing Effects
import { Selection, Select, Outline, ToneMapping, EffectComposer, Vignette } from '@react-three/postprocessing';
import { ToneMappingMode, BlendFunction } from 'postprocessing';

// Custom Hooks & Components
import OptimiseModel from '../hooks/useOptimiseModel.js';
import CameraController from './CameraController';
import { useCameraLogic } from '../hooks/useCameraLogic';
import Interactable from './Interactable.js';


// Performance Monitoring
import { Perf } from 'r3f-perf';
import { useControls } from 'leva';


export default function Experience({ onSelectProject, isVisible }) {
    
    // Setup Camera
    const [cameraState, setCameraState] = useState('intro');
    const [hovered, setHovered] = useState(false); 
    const orbitRef = useRef();
    useCameraLogic({ cameraState, setCameraState, isVisible });

    // Static Scene
    const staticScene = useMemo(() => useGLTF('/Models/WinterScene.gltf'), []);
    

    // Debug
    const { posX, posY, posZ, rotX, rotY, rotZ } = useControls('Text Debug', {
        posX: { value: -1.4, min: -10, max: 10, step: 0.1 },
        posY: { value: -0.2, min: -10, max: 10, step: 0.1 },
        posZ: { value: 2.2, min: -10, max: 10, step: 0.1 },
        rotX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
        rotY: { value: 2.3, min: -Math.PI, max: Math.PI, step: 0.01 },
        rotZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    });


    const handleArcadeClick = () => {
        if (cameraState === 'focusArcade') return;
        
        console.log(cameraState);
        setCameraState('focusArcade');
        onSelectProject({
            title: 'Arcade Machine',
            description: 'Shows Project Display UI',
        });
    };

    const handleSignClick = () => {
        if (cameraState === 'focusSign') return;
        
        console.log(cameraState);
        setCameraState('focusSign');
        onSelectProject({
            title: 'Sign Post',
            description: 'Shows About Section',
        });
    };

    const handlePointerDown = (e) => {
        // If user clicked *outside* of interactables, reset focus
        const clickedObj = e.intersections?.[0]?.object;
      
        if (
          cameraState.includes('focus') &&
          clickedObj?.userData?.type !== 'interactable'
        ) {
          setCameraState('intro');
          onSelectProject(null); // Clear any project UI
        }
      };
      

    const isFocused = cameraState.includes('focus');
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


    return (
        <>
            {/* Perf component monitors performance */}
            <Perf position="top-left" />

            {/* Camera Setup */}
            <CameraController cameraState={cameraState} setCameraState={setCameraState} orbitRef={orbitRef} />

            {/* Environment, Lighting & Background */}
            {environment}
            <Stars radius={5} depth={18} count={1000} factor={1.5} saturation={0} fade speed={0.75} />

            {/* Orbit Controls */}
            <OrbitControls enabled={cameraState === 'orbit'} ref={orbitRef} 
                makeDefault enableDamping={true} dampingFactor={0.05} enablePan={false} 
                minPolarAngle={Math.PI / 4.5} maxPolarAngle={Math.PI / 2.2}
                minDistance={7.0} maxDistance={25} 
                autoRotate={true} autoRotateSpeed={0.2} 
    
                // Mobile Support [0: Single Finger Rotate -- 1: Two Finger Zoom]
                touches={{ ONE: 0, TWO: 2,}}
            />
            
            <Selection>
                {/* Post Processing */}
                <EffectComposer multisampling={8} autoClear={false}>
                    <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />  
                    <Vignette offset={0.2} darkness={0.45} blendFunction={BlendFunction.COLOR_DODGE} />
                    <Outline visibleEdgeColor="white" edgeStrength={40} width={1000} />
                </EffectComposer>

                {/* Scene Objects */}
                {/* <Float 
                    rotationIntensity={floatConfig.rotationIntensity}
                    floatIntensity={floatConfig.floatIntensity}
                    speed={1}
                > */}

                {/* Static Scene */}
                <primitive object={staticScene.scene} scale={0.4} position-y={-1.4} castShadow={false} receiveShadow={false} />
                
                {/* Interactables */}
                <Select enabled={hovered}>
                    
                    {/* Arcade Machine */}
                    <Interactable modelName="ArcadeMachine" position-y={-1.4} castShadow={false} receiveShadow={false}
                    onClick={handleArcadeClick}
                    />

                    {/* Sign Post */}
                    <Interactable modelName="SignPost" position-y={-1.4} castShadow={false} receiveShadow={false}
                    onClick={handleSignClick}
                    />
                    
                </Select>
                    <Text
                        // font="/Fonts/Patrick Hand_Regular.json"
                        fontSize={0.2}
                        position={ [posX, posY, posZ]}
                        rotation={ [rotX, rotY, rotZ]}
                        maxWidth={ 2 }
                        textAlign='center'
                        color={'black'}
                    >
                        JAKE ROSE
                    </Text>
                {/* </Float> */}
            </Selection>            
        </>
    );
}