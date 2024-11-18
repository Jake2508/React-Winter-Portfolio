import { useGLTF, useProgress } from "@react-three/drei";
import { useEffect, useMemo } from "react";

export default function Floor() {
    const { scene } = useGLTF('/Models/Floor.gltf');

    // Optimize geometry
    useEffect(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.frustumCulled = true; // Enable frustum culling
                child.castShadow = false;  // Avoid unnecessary shadows
                child.receiveShadow = true;
            }
        });
    }, [scene]);

    return <primitive object={scene} scale={0.4} position={[0, -1.4, 0]} />;
}