import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

/*
  Keeps the whole diorama in frame at any window shape. Above ~1.55 aspect the
  vertical extent limits the framing so distance holds; below that the diorama
  is wider than the viewport and distance grows as 1/aspect, or a phone in
  portrait crops most of the islands. Direction and zoom survive the resize.
*/
const REFERENCE_ASPECT = 1.55;
const MAX_PULLBACK = 3.4;      // enough for a tall phone
const ZOOM_IN_LIMIT = 0.55;    // how far in the visitor may scroll, relative
const ZOOM_OUT_LIMIT = 1.45;

// Half-extent of the diorama plus a margin, used to keep it off the far plane
const SCENE_RADIUS = 8;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const ResponsiveCamera = ({ target, baseRadius }) => {
    const camera = useThree((state) => state.camera);
    const controls = useThree((state) => state.controls);
    const width = useThree((state) => state.size.width);
    const height = useThree((state) => state.size.height);

    // Previous radius, so a resize can carry the visitor's zoom across
    const previousRadius = useRef(null);

    useEffect(() => {
        if (!width || !height) return;

        const aspect = width / height;
        const pullback = Math.min(MAX_PULLBACK, Math.max(1, REFERENCE_ASPECT / aspect));

        // Never frame past the far plane — on a tall phone the pull-back alone
        // nears it, and zooming out beyond would clip the diorama away entirely.
        const furthestVisible = Math.max(baseRadius, camera.far - SCENE_RADIUS);
        const radius = Math.min(baseRadius * pullback, furthestVisible);

        const focus = new THREE.Vector3(...target);
        const offset = camera.position.clone().sub(focus);

        // Fall back to the committed direction if the camera is sat on the target
        if (offset.lengthSq() < 1e-6) offset.set(0, 1, 1);

        // Carry the visitor's relative zoom through the resize
        const zoomRatio = previousRadius.current
            ? clamp(offset.length() / previousRadius.current, ZOOM_IN_LIMIT, ZOOM_OUT_LIMIT)
            : 1;

        previousRadius.current = radius;
        camera.position.copy(focus).addScaledVector(offset.normalize(), radius * zoomRatio);

        if (controls) {
            // Proportional, not fixed — fixed clamps fight the pull-back
            controls.minDistance = radius * ZOOM_IN_LIMIT;
            controls.maxDistance = Math.min(radius * ZOOM_OUT_LIMIT, furthestVisible);
            controls.update();
        }
    }, [camera, controls, width, height, baseRadius, target]);

    return null;
};


export default ResponsiveCamera;
