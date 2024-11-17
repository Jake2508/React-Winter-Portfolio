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
    const arcadeMachine = useGLTF('/Models/ArcadeMachine-v4.gltf');
    const machineSwitch = useGLTF('/Models/switch.gltf');
    const cable = useGLTF('/Models/cable.gltf');

    // Hover Effect Hook
    const { handlePointerOver, handlePointerOut, hoveredObject } = useHover(); 

    const handleArcadeClick = () => {
        onSelectProject({
            title: 'Arcade Machine',
            description: 'A retro arcade machine filled with fun!',
        });
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
            <directionalLight position={[2, 3, 10]} intensity={0.65} color={"#f0e68c"} />
            <ambientLight intensity={0.3} color={'#ffffff'} /> 

            {/* Post Processing */}
            <EffectComposer>
                <ToneMapping mode={ToneMappingMode.ACES_FILMIC} /> 
                <Vignette offset={0.3} darkness={0.85} blendFunction={BlendFunction.COLOR_DODGE} />
                {/* <Bloom mipmapBlur intensity={0.1} luminanceThreshold={0.8} /> TEMP */}
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
            <primitive object={arcadeMachine.scene} scale={0.4} position-y={-1.4} castShadow receiveShadow
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