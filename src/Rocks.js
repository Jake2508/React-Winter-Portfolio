import { useGLTF } from "@react-three/drei";

export default function Rocks() {
    const rocks = useGLTF('/Models/Rocks.gltf');

    return (
        <primitive 
            object={rocks.scene} 
            scale={0.4}
            position={[0, -1.4, 0]}
        />
    );
}