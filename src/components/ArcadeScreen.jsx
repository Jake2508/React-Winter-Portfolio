import React, { useMemo, useRef } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SCENE_FONT, SCENE_FONT_MONO } from '../utils/sceneFont.js';
import { COLOURS } from '../theme.js';

// ── Screen tuning ────────────────────────────────────────────────────────────
// DEPTH sits the content off the screen face. It has to clear more than the
// glyphs: the CTA tilts, which swings its height through Z (0.0085 worst case).
const DEPTH = 0.022;

const BREATH_HZ = 0.5;         // CTA grow/shrink
const TILT_HZ = 0.32;          // offset from the breath so it never looks mechanical
const TILT_RADIANS = 0.085;    // ~5 degrees
const SCALE_RANGE = 0.05;

const SCAN_SECONDS = 5;        // one pass down the screen
const SCAN_HEIGHT = 0.16;      // band height, as a fraction of the screen

const REDUCED_MOTION = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Soft-edged band for the scanline. Built once, never updated.
const useScanTexture = () => useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 64;

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 64);
    gradient.addColorStop(0, 'rgba(160,220,255,0)');
    gradient.addColorStop(0.5, 'rgba(160,220,255,1)');
    gradient.addColorStop(1, 'rgba(160,220,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1, 64);

    return new THREE.CanvasTexture(canvas);
}, []);


/*
  The cabinet's attract screen. SDF text rather than a canvas texture, so it
  stays crisp at any zoom and nothing is uploaded per frame.

  Every material sets toneMapped={false}: the composer's ACES pass would
  otherwise shift the accents off their tokens, and only inconsistently — a
  <Text> with a colour prop gets tone mapped, one with a material child does not.

  fontWeight is absent on purpose. troika takes a single font file here and does
  no synthetic bolding, so the prop did nothing; weight comes from the file.
*/
const ArcadeScreen = ({ width, height, dimmed = false }) => {
    const cta = useRef();
    const ctaMaterial = useRef();
    const scan = useRef();
    const scanTexture = useScanTexture();

    useFrame(({ clock }) => {
        if (!cta.current || !ctaMaterial.current) return;

        // Hold steady while the panel covers the cabinet
        if (dimmed || REDUCED_MOTION) {
            cta.current.scale.setScalar(1);
            cta.current.rotation.x = 0;
            ctaMaterial.current.opacity = 1;
            if (scan.current) scan.current.visible = false;
            return;
        }

        const t = clock.getElapsedTime();

        const breath = Math.sin(t * Math.PI * 2 * BREATH_HZ);
        const tilt = Math.sin(t * Math.PI * 2 * TILT_HZ);

        cta.current.scale.setScalar(1 + SCALE_RANGE * breath);
        cta.current.rotation.x = TILT_RADIANS * tilt;

        // Never fully off, so the CTA stays readable and does not strobe
        ctaMaterial.current.opacity = 0.62 + 0.38 * (0.5 + 0.5 * breath);

        // Scanline drifts top to bottom and wraps
        if (scan.current) {
            scan.current.visible = true;
            const progress = (t % SCAN_SECONDS) / SCAN_SECONDS;
            scan.current.position.y = height * (0.5 + SCAN_HEIGHT) - progress * height * (1 + SCAN_HEIGHT * 2);
        }
    });

    return (
        <>
            {/* Screen face */}
            <mesh>
                <planeGeometry args={[width, height]} />
                <meshBasicMaterial color={COLOURS.ground} toneMapped={false} />
            </mesh>

            {/* Display line — Outfit, matching the panel's name treatment */}
            <Text
                font={SCENE_FONT}
                fontSize={height * 0.125}
                letterSpacing={0.14}
                position={[0, height * 0.26, DEPTH]}
                anchorX="center"
                anchorY="middle"
            >
                PORTFOLIO
                <meshBasicMaterial color={COLOURS.gold} toneMapped={false} />
            </Text>

            {/* Label line — mono, wide tracking, like the panel's roles line */}
            <Text
                font={SCENE_FONT_MONO}
                fontSize={height * 0.058}
                letterSpacing={0.2}
                position={[0, height * 0.145, DEPTH]}
                anchorX="center"
                anchorY="middle"
            >
                WINTER 2026
                <meshBasicMaterial color={COLOURS.blue} toneMapped={false} />
            </Text>

            {/* Hairline divider, same role as the panel's section rules */}
            <mesh position={[0, height * 0.07, DEPTH]}>
                <planeGeometry args={[width * 0.6, height * 0.005]} />
                <meshBasicMaterial color={COLOURS.hairline} toneMapped={false} />
            </mesh>

            <Text
                ref={cta}
                font={SCENE_FONT_MONO}
                fontSize={height * 0.082}
                letterSpacing={0.12}
                position={[0, -height * 0.05, DEPTH]}
                anchorX="center"
                anchorY="middle"
            >
                CLICK TO PLAY
                <meshBasicMaterial
                    ref={ctaMaterial}
                    color={COLOURS.gold}
                    toneMapped={false}
                    transparent
                />
            </Text>

            <Text
                font={SCENE_FONT_MONO}
                fontSize={height * 0.045}
                letterSpacing={0.18}
                position={[0, -height * 0.27, DEPTH]}
                anchorX="center"
                anchorY="middle"
            >
                PRESS START
                <meshBasicMaterial color={COLOURS.green} toneMapped={false} />
            </Text>

            {/* Scanline — sits above the text, additive so it only brightens */}
            <mesh ref={scan} position={[0, 0, DEPTH + 0.004]}>
                <planeGeometry args={[width, height * SCAN_HEIGHT]} />
                <meshBasicMaterial
                    map={scanTexture}
                    transparent
                    opacity={0.14}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    toneMapped={false}
                />
            </mesh>
        </>
    );
};


export default ArcadeScreen;
