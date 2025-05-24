import { useRef, useState, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';


export function useInteractable(modelName) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  // Dynamically load the model based on the modelName prop - Link to optimise
  const model = useMemo(() => useGLTF(`/Models/${modelName}.gltf`), [modelName]);

  // Optimise? 

  const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = 'pointer'; 
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'default'; 
  };


  return {
    ref,
    model,
    hovered,
    handlePointerOver,
    handlePointerOut,
  };
}