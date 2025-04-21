import { useEffect } from 'react';


export function useCameraLogic({ cameraState, setCameraState, isVisible }) {
    useEffect(() => {
        // Reset to default
        if (!isVisible && cameraState === 'focusArcade') {
            setCameraState('intro');
        }
    }, [isVisible, cameraState]);
}