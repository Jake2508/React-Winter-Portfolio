import { useGLTF, useAnimations, MeshTransmissionMaterial } from "@react-three/drei";
import { useEffect } from "react";

export default function Rings() {
    const rings = useGLTF('/animation.gltf');
    const animations = useAnimations(rings.animations, rings.scene);
    console.log(animations);

    

    useEffect(() => {
        // Play all animations
        const actions = [animations.actions.Spin, animations.actions['Spin.001'], animations.actions['Spin.002']];
        
        actions.forEach(action => {
            if (action) {
                action.play();
            }
        });
    }, [animations.actions]); // Dependency array ensures this runs when animations are loaded

    return (
        <primitive 

            object={rings.scene} 
            scale={0.5}
            position={[0, -3.4, 0]}
        />
    );
}



                    {/* Example 3: MeshTransmissionMaterial */}
                    // <MeshTransmissionMaterial thickness={0.5} transmission={1} roughness={0.1} chromaticAberration={0.2} color={new Color(0xffffff)} />