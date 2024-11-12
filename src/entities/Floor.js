import { useGLTF } from "@react-three/drei";

export default function Floor() {
    const floor = useGLTF('/Models/Floor.gltf');

    return (
        <primitive 
            object={floor.scene} 
            scale={0.4}
            position={[0, -1.4, 0]}
        />
    );
}