import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";


export default function WinterEnvironment() {
    const { scene } = useGLTF('/Models/WinterEnvironment.gltf');

    // Optimize environment setup 
    const optimizedScene = useMemo(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.frustumCulled = true; 
                child.castShadow = false; 
                child.receiveShadow = false;
            }
        });

        return scene;
    }, [scene]);

    return <primitive object={scene} scale={0.4} position={[0, -1.4, 0]} />;
}