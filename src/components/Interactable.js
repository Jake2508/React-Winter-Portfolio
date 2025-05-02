import React from 'react';
import { Select } from '@react-three/postprocessing';
import { useInteractable } from '../hooks/useInteractable';
import { a, useSpring } from '@react-spring/three';


function Interactable({ modelName, onClick, ...props }) {
  const { ref, model, hovered, handlePointerOver, handlePointerOut } = useInteractable(modelName);

  const { scale } = useSpring({
    scale: hovered ? 0.5 : 0.4,
    config: { tension: 300, friction: 20 },
  });

  return (
    <Select enabled={hovered}>
      <a.mesh
        ref={ref}
        {...props}
        scale={scale}
        userData={{ type: 'interactable', name: modelName }}
        onClick={onClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Optimise Model? */}


        {/* Render the dynamically loaded model */}
        <primitive object={model.scene} />

      </a.mesh>
    </Select>
  );
}


export default Interactable;