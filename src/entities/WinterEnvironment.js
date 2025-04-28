import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh';


export default function WinterEnvironment() {
    // const { scene } = useGLTF('/Models/WinterEnvironment.gltf');
    const { scene } = useGLTF('/Models/WinterScene.gltf');

    // Optimize environment setup 
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

    return <primitive object={optimizedScene} scale={0.4} position={[0, -1.4, 0]} />;
}

// Preload at app start
useGLTF.preload('/Models/WinterEnvironment.gltf');