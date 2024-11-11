import { useGLTF, useAnimations, MeshTransmissionMaterial } from "@react-three/drei";
import { useEffect } from "react";

export default function Trees() {
    const trees = useGLTF('/Models/Trees.gltf');
    const animations = useAnimations(trees.animations, trees.scene);
    console.log(animations);


    useEffect(() => {
        // Play all animations -> Would of been via deform modifer but can't export anim modifiers
        const actions = [animations.actions['Sway.001'], animations.actions['Sway.002'], animations.actions['Sway.003'], animations.actions['Sway.004'], animations.actions['Sway.005']];
        
        actions.forEach(action => {
            if (action) {
                action.play();
            }
        });
    }, [animations.actions]); // Dependency array ensures this runs when animations are loaded

    return (
        <primitive 

            object={trees.scene} 
            scale={0.4}
            position={[0, -1.4, 0]}
        />
    );
}