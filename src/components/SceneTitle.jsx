// Core Extensions
import React, { useRef } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { a, useSpring } from '@react-spring/three';
import { SCENE_FONT } from '../utils/sceneFont.js';
import { COLOURS } from '../theme.js';

// ── Placement tuning ─────────────────────────────────────────────────────────
// The sign is planted in the snow in front of the cabinet. `anchor` is the
// point it grows from, in scene units with the diorama centred on the origin.
// These are the committed values; the dev debug panel overrides them live so
// you can dial in a framing, then paste the result back in here.
export const TITLE_DEFAULTS = {
    anchor: [4.9, -1.15, -3.3],
    rise: 0.78,   // height of the name above the anchor
    size: 0.5,
};


/*
  Replaces the old screen-space logo. Yaws to face the camera but never pitches,
  so the sign stays upright in the snow and stays readable wherever the orbit
  happens to be. Drops away while the panel is open.

  Name only, no role line — the header bar already carries the disciplines, and
  pinning one title to the scene narrows how the site reads.

  drei's <Billboard> is not used here: its lockX/lockZ restore rotation on the
  outer group while the camera-facing quaternion lands on the inner one, so the
  locks do nothing and the text tips over to face the downward-looking camera.
*/
const SceneTitle = ({ visible, anchor = TITLE_DEFAULTS.anchor, rise = TITLE_DEFAULTS.rise, size = TITLE_DEFAULTS.size }) => {
    const groupRef = useRef();

    const { scale } = useSpring({
        scale: visible ? 1 : 0.001,
        config: { mass: 1, tension: 170, friction: 24 },
    });

    useFrame(({ camera }) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = Math.atan2(
            camera.position.x - anchor[0],
            camera.position.z - anchor[2],
        );
    });

    return (
        <a.group ref={groupRef} position={anchor} scale={scale}>
            <Text
                font={SCENE_FONT}
                fontSize={size}
                letterSpacing={0.12}
                position-y={rise}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.022}
                outlineColor={COLOURS.outline}
                outlineOpacity={0.85}
            >
                JAKE ROSE
                <meshBasicMaterial color={COLOURS.white} toneMapped={false} />
            </Text>
        </a.group>
    );
};


export default SceneTitle;
