// Core Extensions
import React, { useRef } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { a, useSpring } from '@react-spring/three';

// ── Placement tuning ─────────────────────────────────────────────────────────
// The sign is planted in the snow in front of the cabinet. ANCHOR is the point
// it grows from, in scene units with the diorama centred on the origin — these
// are the only values worth touching when the camera framing changes.
const ANCHOR     = [4.9, -1.15, -3.3];
const TITLE_RISE = 0.78;   // height of the name above the anchor
const TITLE_SIZE = 0.5;

/*
  Outfit is already fetched for the DOM UI, but troika needs the font file
  itself rather than a CSS face — and it rejects woff2, so this is the ttf.
  Drop a copy in public/Fonts and point this at it to lose the runtime CDN
  dependency; troika falls back to its own face if the URL ever fails.
*/
const FONT = 'https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4bCyO4a0Fg.ttf';


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
const SceneTitle = ({ visible }) => {
    const groupRef = useRef();

    const { scale } = useSpring({
        scale: visible ? 1 : 0.001,
        config: { mass: 1, tension: 170, friction: 24 },
    });

    useFrame(({ camera }) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y = Math.atan2(
            camera.position.x - ANCHOR[0],
            camera.position.z - ANCHOR[2],
        );
    });

    return (
        <a.group ref={groupRef} position={ANCHOR} scale={scale}>
            <Text
                font={FONT}
                fontSize={TITLE_SIZE}
                fontWeight={800}
                letterSpacing={0.12}
                position-y={TITLE_RISE}
                anchorX="center"
                anchorY="middle"
                color="#ffffff"
                outlineWidth={0.022}
                outlineColor="#04203c"
                outlineOpacity={0.85}
            >
                JAKE ROSE
            </Text>
        </a.group>
    );
};


export default SceneTitle;
