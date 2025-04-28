import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import { computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh';

export default function ArcadeMachine({ onPointerOver, onPointerOut, onClick }) {
    const { scene } = useGLTF('/Models/ArcadeMachine.gltf');

    // Optimize model setup
    const optimizedScene = useMemo(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.frustumCulled = true;
                child.castShadow = false;
                child.receiveShadow = false;
                child.geometry.computeBoundsTree = computeBoundsTree;
                child.geometry.disposeBoundsTree = disposeBoundsTree;
                child.geometry.computeBoundsTree();
            }
        });

        return scene;
    }, [scene]);

    return (
        <primitive
            object={optimizedScene}
            scale={0.4}
            position-y={-1.4}
            onPointerOver={onPointerOver}
            onPointerOut={onPointerOut}
            onClick={onClick}  // Attach the onClick event here
        />
    );
}

// Preload model at app start
useGLTF.preload('/Models/ArcadeMachine.gltf');
