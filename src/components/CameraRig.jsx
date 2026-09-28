import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

/*
  Dev-only bridge between the debug panel and the live camera. Writes the
  camera's values into `readout` each frame — a ref, not state, so orbiting
  does not re-render React 60 times a second.
*/
const CameraRig = ({ settings, readout }) => {
    const camera = useThree((state) => state.camera);
    const controls = useThree((state) => state.controls);
    const scene = useThree((state) => state.scene);

    // Console handle for measuring the diorama while tuning (dev only)
    useEffect(() => {
        if (!import.meta.env.DEV) return;
        window.__scene = { scene, camera, controls };
    }, [scene, camera, controls]);

    // Field of view
    useEffect(() => {
        if (settings.fov === undefined) return;
        camera.fov = settings.fov;
        camera.updateProjectionMatrix();
    }, [camera, settings.fov]);

    // OrbitControls rebuilds its spherical coords from the camera position on
    // update(), so setting position then nudging is enough for it to stick.
    // The first run is skipped: ResponsiveCamera frames the scene for the
    // current aspect, and applying the committed position would undo that.
    const lastApplied = useRef(null);

    useEffect(() => {
        const { camX, camY, camZ } = settings;
        if (camX === undefined) return;

        const next = `${camX},${camY},${camZ}`;
        if (lastApplied.current === null || lastApplied.current === next) {
            lastApplied.current = next;
            return;
        }
        lastApplied.current = next;

        camera.position.set(camX, camY, camZ);
        if (controls?.enabled) controls.update();
    }, [camera, controls, settings.camX, settings.camY, settings.camZ]);

    // Orbit target
    useEffect(() => {
        if (!controls || settings.targetX === undefined) return;
        controls.target.set(settings.targetX, settings.targetY, settings.targetZ);
        controls.update();
    }, [controls, settings.targetX, settings.targetY, settings.targetZ]);

    useFrame(() => {
        if (!readout) return;
        readout.current.x = camera.position.x;
        readout.current.y = camera.position.y;
        readout.current.z = camera.position.z;
        readout.current.fov = camera.fov;
        readout.current.far = camera.far;
        readout.current.minDistance = controls?.minDistance ?? 0;
        readout.current.maxDistance = controls?.maxDistance ?? 0;
        readout.current.distance = controls
            ? camera.position.distanceTo(controls.target)
            : camera.position.length();
    });

    return null;
};


export default CameraRig;
