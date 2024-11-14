import { useGLTF } from "@react-three/drei";

export default function Tools() {
    const tools = useGLTF('/Models/Tools.gltf');

    return (
        <primitive 
            object={tools.scene} 
            scale={0.4}
            position={[0, -1.4, 0]}
        />
    );
}