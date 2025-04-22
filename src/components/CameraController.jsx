import { useThree, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';


export default function CameraController({ cameraState, setCameraState, orbitRef }) {
    const { camera } = useThree();
    const targetPosition = useRef(new THREE.Vector3());
    const targetLookAt = useRef(new THREE.Vector3());
    const speedRef = useRef(0.04);

    // Target Positions
    const ORBIT_POSITION = new THREE.Vector3(8, 5, -5);
    const ORBIT_LOOK_AT = new THREE.Vector3(0, -1, 0);

    // On Initial Render: Set camera position and trigger intro transition
    useEffect(() => {
        camera.position.set(50, 50, 10); 
        camera.lookAt(0, 0, 0);
        setCameraState('intro');
        camera.fov = 55; // FOV
        camera.updateProjectionMatrix();
    }, []);

    // Camera Transition Targets
    useEffect(() => {
        switch (cameraState) {
            case 'intro':
                speedRef.current = 0.025; 
                targetPosition.current.copy(ORBIT_POSITION);
                targetLookAt.current.copy(ORBIT_LOOK_AT);
                break;
            case 'orbit':
                speedRef.current = 0.03; 
                targetPosition.current.copy(ORBIT_POSITION);
                targetLookAt.current.copy(ORBIT_LOOK_AT);
                break;
            case 'focusArcade':
                speedRef.current = 0.04; 
                targetPosition.current.set(1.5, 0.4, 0);
                targetLookAt.current.set(0, 0.2, 0);
                break;
            case 'cancelFocus':
                speedRef.current = 0.025; 
                targetPosition.current.copy(ORBIT_POSITION);
                targetLookAt.current.set(0, 0.0, 0);
                break;
            default:
                break;
        }
        console.log('CameraState changed to:', cameraState);
    }, [cameraState]);

    // Smooth Camera Movement
    useFrame(() => {
        if (cameraState !== 'orbit' || cameraState.startsWith('focus')) {
            camera.position.lerp(targetPosition.current, speedRef.current);
            camera.lookAt(targetLookAt.current);

            // Transition to orbit mode after intro
            if (
                (cameraState === 'intro' || cameraState === 'cancelFocus') &&
                camera.position.distanceTo(targetPosition.current) < .75
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
