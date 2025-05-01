import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';


function OptimiseModel({ modelPath, scale = 1, position = [0, 0, 0], name }) {
  const { scene } = useGLTF(modelPath, true, (loader) => {
    loader.setDRACOLoader(new DRACOLoader());
    loader.setDRACOLoaderPath("/draco/");
  });

  // Memoize the optimization process
  const optimizedScene = useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // Apply optimization logic here
        child.frustumCulled = true;  // Avoid rendering when off-screen
        child.castShadow = false;    // Disable casting shadows
        child.receiveShadow = false; // Disable receiving shadows
        child.geometry.computeBoundsTree = computeBoundsTree;
        child.geometry.disposeBoundsTree = disposeBoundsTree;
        child.geometry.computeBoundsTree();
      }
    });

    return scene;
  }, [scene]);

  return (
    <primitive object={optimizedScene} scale={scale} position={position} />
  );
}

export default OptimiseModel;
