import { useMemo, Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh';


function OptimiseModel({ modelPath, scale, position, enableBVH = true }) {
  // Lazy load with DRACO
  const { scene } = useGLTF(modelPath, true, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    loader.setDRACOLoader(dracoLoader);
  });

  const optimizedScene = useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.frustumCulled = true;
        child.castShadow = false;    
        child.receiveShadow = false;  

        if (enableBVH && child.geometry) {
          child.geometry.computeBoundsTree = computeBoundsTree;
          child.geometry.disposeBoundsTree = disposeBoundsTree;
          child.geometry.computeBoundsTree();
        }
      }
    });

    return scene;
  }, [scene, enableBVH]);

  return (
    <primitive
      object={optimizedScene}
      scale={scale ?? optimizedScene.scale}
      position={position ?? optimizedScene.position}
    />
  );
}


export default function OptimiseModelWrapper(props) {
  return (
    <Suspense fallback={null}>
      <OptimiseModel {...props} />
    </Suspense>
  );
}
