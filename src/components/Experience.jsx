// Core Extensions
import { Html, Stars, GradientTexture, Environment, OrbitControls } from '@react-three/drei';
import React, { useMemo, useState } from 'react';

// Post Processing Effects
import { Selection, Outline, ToneMapping, EffectComposer, Vignette } from '@react-three/postprocessing';
import { ToneMappingMode, BlendFunction } from 'postprocessing';

// Custom Hooks & Components
import ArcadeMachine from './ArcadeMachine.jsx';
import OptimiseModel from './OptimiseModel.jsx';
import SceneTitle from './SceneTitle.jsx';
import CameraRig from './CameraRig.jsx';
import ResponsiveCamera from './ResponsiveCamera.jsx';
import { MULTISAMPLING } from '../utils/deviceProfile.js';
import { COLOURS } from '../theme.js';


export default function Experience({ onSelectProject, isVisible, showTitle, orbitTarget, baseRadius, debug, cameraReadout }) {

    const [hovered, setHovered] = useState(false);

    const handleArcadeClick = () => {
        onSelectProject({
            title: 'Arcade Machine',
            description: 'Shows Project Display UI',
        });
    };

    // Memorise Environment
    const environment = useMemo(() => (
        <>
            <Environment preset="forest" />
            <GradientTexture 
                stops={[0, 0.3, 1]} 
                colors={['#001F3F', '#1B4F72', COLOURS.blue]} 
                size={512} 
                attach="background" 
            />
        </>
    ), []);

        
    return (
        <>
            {/* Perf component monitors performance */}
            {/* <Perf position="top-left" /> */}

            {/* Environment, Lighting & Background */}
            {environment}
            <Stars 
                radius={5}
                depth={18} 
                count={1200} 
                factor={1.4} 
                saturation={0} 
                fade speed={0.75} 
            />

            <Selection>
                {/* Post Processing */}
                <EffectComposer multisampling={MULTISAMPLING} autoClear={false}>
                    <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
                    <Vignette offset={0.2} darkness={0.45} blendFunction={BlendFunction.COLOR_DODGE} />
                    <Outline visibleEdgeColor="white" edgeStrength={5} width={800} 
                        selection={hovered ? undefined : []} />
                </EffectComposer>

                {/* Orbit Controls */}
                <OrbitControls makeDefault enableDamping={true} dampingFactor={0.1} enablePan={false}
                    target={debug ? [debug.targetX, debug.targetY, debug.targetZ] : orbitTarget}
                    minPolarAngle={Math.PI / 4.5} maxPolarAngle={Math.PI / 2.2}
                    enabled={!isVisible && (debug ? debug.orbitEnabled : true)}
                    autoRotate={!isVisible && (debug ? debug.autoRotate : true)} autoRotateSpeed={0.2}
                    // Mobile Support
                    touches={{ 
                        ONE: 0, // Single-finger rotate
                        TWO: 2, // Two-finger zoom
                    }}
                />

                {/* Static Scene Objects */}
                <OptimiseModel modelPath="/Models/WinterScene.gltf" scale={0.4} position={[0, -1.4, 0]} enableBVH={true} />

                {/* World-space title — replaces the old screen-space logo */}
                {showTitle && <SceneTitle
                    visible={!isVisible}
                    anchor={debug ? [debug.titleX, debug.titleY, debug.titleZ] : undefined}
                    rise={debug ? debug.titleRise : undefined}
                    size={debug ? debug.titleSize : undefined}
                />}

                {/* Keeps the whole diorama framed on any window shape */}
                <ResponsiveCamera target={orbitTarget} baseRadius={baseRadius} />

                {/* Dev-only: lets the debug panel drive and read the camera */}
                {debug && <CameraRig settings={debug} readout={cameraReadout} />}

                {/* Interactables */}

                {/* Arcade Machine */}
                <ArcadeMachine position-y={-1.4} castShadow={false} receiveShadow={false}
                    onClick={handleArcadeClick} setHovered={setHovered} isVisible={isVisible}
                />

                {/* World-space tooltip — hidden once the panel is open */}
                {/* {!isVisible && (
                    <Html position={[0, 1.4, 0]} center distanceFactor={10} zIndexRange={[1, 0]} style={{ pointerEvents: 'none' }}>
                        <div className={`arcadeTooltip${hovered ? ' arcadeTooltipHovered' : ''}`}>
                            <span className="arcadeTooltipLabel">Click to open</span>
                            <span className="arcadeTooltipArrow">↓</span>
                        </div>
                    </Html>
                )} */}
            </Selection>
        </>
    );
}