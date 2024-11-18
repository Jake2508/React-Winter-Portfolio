// Core Extensions
import { Stars, GradientTexture, Environment, useGLTF, OrbitControls } from '@react-three/drei';

// Post Processing Effects
import { ToneMapping, EffectComposer, DepthOfField, Bloom, Vignette } from '@react-three/postprocessing';
import { ToneMappingMode, BlendFunction } from 'postprocessing';

// Custom Hooks & Components
import { useHover } from '../hooks/useHover.js'; 

// Entities
import Floor from '../entities/Floor.js';
import Trees from '../entities/Trees.js';
import Rocks from '../entities/Rocks.js';
import Tools from '../entities/Tools.js';

// Performance Monitoring
import { Perf } from 'r3f-perf';


export default function Experience({ onSelectProject, isVisible }) {
    // Setup Models
    const arcadeMachine = useGLTF('/Models/ArcadeMachine.gltf');
    const machineSwitch = useGLTF('/Models/switch.gltf');
    const cable = useGLTF('/Models/cable.gltf');

    // Hover Effect Hook
    const { handlePointerOver, handlePointerOut, hoveredObject } = useHover(); 

    const handleArcadeClick = () => {
        onSelectProject({
            title: 'Arcade Machine',
            description: 'Shows Project Display UI',
        });
    };

    return (
        <>
            {/* Perf component monitors performance */}
            {/* <Perf position="top-left" /> */}

            {/* Background & Environment */}
            <Environment preset="forest" />
            <GradientTexture stops={[0, 0.3, 1]} colors={['#001F3F', '#1B4F72', '#85C1E9']} size={512} attach="background" />
            <Stars radius={40} depth={50} count={4000} factor={4} saturation={0} fade speed={0.75} />

            {/* Lighting */}
            <ambientLight intensity={0.3} color={'#ffffff'} /> 

            {/* Post Processing */}
            <EffectComposer>
                <ToneMapping mode={ToneMappingMode.ACES_FILMIC} /> 
                <Vignette offset={0.3} darkness={0.85} blendFunction={BlendFunction.COLOR_DODGE} />
                <DepthOfField focusDistance={0.015} focalLength={0.025} bokehScale={0.5} />
            </EffectComposer>

            <OrbitControls makeDefault enableDamping={true} dampingFactor={0.05} enablePan={false} minPolarAngle={Math.PI / 4.5} maxPolarAngle={Math.PI / 2.2}
                minDistance={7.0} maxDistance={25} 
                enabled={!isVisible}  
                autoRotate={true} autoRotateSpeed={0.35}
            />

            {/* Static Scene Objects */}
            <Floor />
            <Trees />
            <Rocks />
            <Tools />
            
            {/* Arcade Machine */}
            <primitive object={arcadeMachine.scene} scale={0.4} position-y={-1.4} 
                onPointerOver={(event) => handlePointerOver(event, arcadeMachine.scene)} 
                onPointerOut={(event) => handlePointerOut(event, arcadeMachine.scene)}
                onClick={handleArcadeClick}
            />

            {/* Switch and Cable */}
            <primitive object={machineSwitch.scene} scale={0.4} position-y={-1.4} />
            <primitive object={cable.scene} scale={0.4} position-y={-1.4} />
        </>
    );
}