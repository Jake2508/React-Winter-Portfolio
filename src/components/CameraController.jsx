import { useThree, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';


export default function CameraController({ cameraState, setCameraState, orbitRef }) {
    const { camera } = useThree();
    const targetPosition = useRef(new THREE.Vector3());
    const targetLookAt = useRef(new THREE.Vector3());
    const speed = 0.05;

    // Target Positions
    const ORBIT_POSITION = new THREE.Vector3(6, 3, -5);
    const ORBIT_LOOK_AT = new THREE.Vector3(0, -1, 0);

    // On Initial Render: Set camera position and trigger intro transition
    useEffect(() => {
        camera.position.set(50, 50, -20); 
        camera.lookAt(0, 0, 0);
        setCameraState('intro');
    }, []);

    // Camera Transition Targets
    useEffect(() => {
        switch (cameraState) {
            case 'intro':
                targetPosition.current.copy(ORBIT_POSITION);
                targetLookAt.current.copy(ORBIT_LOOK_AT);
                break;
            case 'focusArcade':
                targetPosition.current.set(1.5, 2.5, 6);
                targetLookAt.current.set(0, 0, 0);
                break;
            default:
                break;
        }
    }, [cameraState]);

    // Smooth Camera Movement
    useFrame(() => {
        if (cameraState === 'intro' || cameraState.startsWith('focus')) {
            camera.position.lerp(targetPosition.current, speed);
            camera.lookAt(targetLookAt.current);

            // Transition to orbit mode after intro
            if (
                cameraState === 'intro' &&
                camera.position.distanceTo(targetPosition.current) < 0.1
            ) {
                // Set OrbitControls target to camera lookAt
                if (orbitRef?.current) {
                    orbitRef.current.target.copy(targetLookAt.current);
                    orbitRef.current.update();
                }

                setCameraState('orbit');
            }
        }
    });

    return null;
}
