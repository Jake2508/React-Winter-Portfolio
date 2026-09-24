// Core Extensions
import { useMemo, useState } from 'react';
import { useGLTF } from '@react-three/drei';

// Post Processing
import { Select } from '@react-three/postprocessing';

// Animation
import { a, useSpring } from '@react-spring/three';

// Custom Components
import ArcadeScreen from './ArcadeScreen.jsx';

// ── Screen overlay tuning ────────────────────────────────────────────────────
// All values are in GLTF scene space (before the parent a.mesh applies scale/offset).
// Flip DEBUG to true to see a bright red plane — adjust SCREEN_* until it lines up
// with the arcade screen face, then set DEBUG back to false.
const DEBUG      = false;
const SCREEN_POS = [0.70, 4.15, -0.07];  // [x, y, z]
const SCREEN_W   = 1.64;
const SCREEN_H   = 1.64;
const SCREEN_ROT = [0, Math.PI / 2, 0];  // face +X toward camera

// Screen content lives in ArcadeScreen.jsx

// Inline so it beats the canvas's own `cursor: grab`; cleared back to it on out
const setCanvasCursor = (value) => {
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.style.cursor = value;
};

function ArcadeMachine({ onClick, setHovered, isVisible, ...props }) {

    const gltf  = useGLTF('/Models/ArcadeMachine.gltf');
    const scene = useMemo(() => gltf.scene.clone(true), [gltf]);

    const [hovered, setLocalHovered] = useState(false);

    // ── Hover spring ─────────────────────────────────────────────────────────
    const { scale } = useSpring({
        scale: hovered ? 0.5 : 0.4,
        config: { tension: 300, friction: 20 },
    });

    const handlePointerOver = () => {
        setLocalHovered(true);
        if (setHovered) setHovered(true);
        setCanvasCursor('pointer');
    };

    const handlePointerOut = () => {
        setLocalHovered(false);
        if (setHovered) setHovered(false);
        setCanvasCursor('');
    };

    return (
        <Select enabled={hovered}>
            <a.mesh
                {...props}
                scale={scale}
                userData={{ type: 'interactable', name: 'ArcadeMachine' }}
                onClick={onClick}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
            >
                <primitive object={scene} />

                {/* Screen overlay — sits on the front face of the arcade cabinet */}
                <group position={SCREEN_POS} rotation={SCREEN_ROT}>
                    {DEBUG ? (
                        <mesh>
                            <planeGeometry args={[SCREEN_W, SCREEN_H]} />
                            <meshBasicMaterial color={0xff2222} toneMapped={false} />
                        </mesh>
                    ) : (
                        <ArcadeScreen width={SCREEN_W} height={SCREEN_H} dimmed={isVisible} />
                    )}
                </group>

            </a.mesh>
        </Select>
    );
}

useGLTF.preload('/Models/ArcadeMachine.gltf');

export default ArcadeMachine;
