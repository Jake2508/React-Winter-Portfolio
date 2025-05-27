import { useRef, useState, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';


export function useInteractable(modelName, setHoveredFromParent) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  // Dynamically load the model based on the modelName prop
  const model = useMemo(() => useGLTF(`/Models/${modelName}.gltf`), [modelName]);

  const handlePointerOver = () => {
    setHovered(true);
    if (setHoveredFromParent) setHoveredFromParent(true);
    document.body.style.cursor = 'pointer'; 
  };

  const handlePointerOut = () => {
    setHovered(false);
    if (setHoveredFromParent) setHoveredFromParent(false);
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