// Core Extensions
import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Post Processing
import { Select } from '@react-three/postprocessing';

// Animation
import { a, useSpring } from '@react-spring/three';

// ── Screen overlay tuning ────────────────────────────────────────────────────
// All values are in GLTF scene space (before the parent a.mesh applies scale/offset).
// Flip DEBUG to true to see a bright red plane — adjust SCREEN_* until it lines up
// with the arcade screen face, then set DEBUG back to false.
const DEBUG      = false;
const SCREEN_POS = [0.70, 4.15, -0.07];  // [x, y, z]
const SCREEN_W   = 1.64;
const SCREEN_H   = 1.64;
const SCREEN_ROT = [0, Math.PI / 2, 0];  // face +X toward camera

// Static 1-pixel stars for the pixel starfield
const STARS = [[12,8],[45,14],[78,5],[110,21],[23,41],[95,37],[62,18],[30,55],[100,50]];


function ArcadeMachine({ onClick, setHovered, ...props }) {

    const gltf  = useGLTF('/Models/ArcadeMachine.gltf');
    const scene = useMemo(() => gltf.scene.clone(true), [gltf]);

    const ref = useRef();
    const [hovered, setLocalHovered] = useState(false);

    // ── Canvases ─────────────────────────────────────────────────────────────
    // pixCanvas: 128×128 "ROM resolution" canvas drawn at pixel scale.
    // canvas: 512×512 texture canvas — pixCanvas is upscaled into it 4× with
    // imageSmoothingEnabled=false, producing an authentic chunky pixel-art look.
    const pixCanvas = useMemo(() => {
        const c = document.createElement('canvas');
        c.width = 128; c.height = 128;
        return c;
    }, []);

    const canvas = useMemo(() => {
        const c = document.createElement('canvas');
        c.width = 512; c.height = 512;
        return c;
    }, []);

    const screenTexture = useMemo(() => {
        const t = new THREE.CanvasTexture(canvas);
        t.colorSpace = THREE.SRGBColorSpace;
        return t;
    }, [canvas]);

    // ── Retro arcade attract-mode renderer ───────────────────────────────────
    useFrame(({ clock }) => {
        if (DEBUG) return;

        const t  = clock.getElapsedTime();
        const px = pixCanvas.getContext('2d');
        const PW = 128;
        const PH = 128;

        // Hard blink ~1.5 Hz — classic arcade "INSERT COIN" style
        const blink = Math.floor(t * 1.5) % 2 === 0;

        // ── Black background ──────────────────────────────────────────────
        px.fillStyle = '#000000';
        px.fillRect(0, 0, PW, PH);

        // ── Twinkling 1-pixel stars ───────────────────────────────────────
        STARS.forEach(([sx, sy]) => {
            const on = Math.floor(t * 2.5 + sx * 0.4) % 3 !== 0;
            px.fillStyle = on ? '#FFFFFF' : '#2a2a2a';
            px.fillRect(sx, sy, 1, 1);
        });

        // ── Top dashed border ─────────────────────────────────────────────
        px.fillStyle = '#FFD700';
        for (let x = 0; x < PW; x += 4) px.fillRect(x, 1, 2, 2);

        // ── Title block ───────────────────────────────────────────────────
        px.textAlign    = 'center';
        px.textBaseline = 'top';

        px.font      = 'bold 9px "Courier New", monospace';
        px.fillStyle = '#FFD700';
        px.fillText('PORTFOLIO', PW / 2, 10);

        px.font      = '7px "Courier New", monospace';
        px.fillStyle = '#00FFFF';
        px.fillText('WINTER  2026', PW / 2, 22);

        // ── Separator ─────────────────────────────────────────────────────
        px.fillStyle = '#333333';
        px.fillRect(8, 34, PW - 16, 1);

        // ── Scrolling snowflake row ────────────────────────────────────────
        const scroll = Math.floor(t * 10) % 16;
        px.save();
        px.beginPath();
        px.rect(4, 38, PW - 8, 10);
        px.clip();
        px.font      = '8px monospace';
        px.fillStyle = '#AADDFF';
        px.fillText('* * * * * * * * * * * * *', (PW / 2) - scroll, 39);
        px.restore();

        // ── Blinking CTA ──────────────────────────────────────────────────
        if (blink) {
            px.font      = 'bold 9px "Courier New", monospace';
            px.fillStyle = '#FFFF00';
            px.fillText('CLICK TO PLAY', PW / 2, 56);

            px.font      = '7px "Courier New", monospace';
            px.fillStyle = '#FFFFFF';
            px.fillText('YOUR PORTFOLIO', PW / 2, 69);
        }

        // ── Separator ─────────────────────────────────────────────────────
        px.fillStyle = '#333333';
        px.fillRect(8, 84, PW - 16, 1);

        // ── Hi-score footer ───────────────────────────────────────────────
        px.font      = '6px "Courier New", monospace';
        px.fillStyle = '#00FF41';
        px.fillText('PLAYER 1  PRESS START', PW / 2, 90);

        px.font      = '5px "Courier New", monospace';
        px.fillStyle = '#555555';
        px.fillText('(C) J.ROSE  2026', PW / 2, 102);

        // ── Bottom dashed border ──────────────────────────────────────────
        px.fillStyle = '#FFD700';
        for (let x = 0; x < PW; x += 4) px.fillRect(x, PH - 3, 2, 2);

        // ── Upscale 4× into the texture canvas (nearest-neighbour) ────────
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(pixCanvas, 0, 0, canvas.width, canvas.height);

        screenTexture.needsUpdate = true;
    });

    // ── Hover spring ─────────────────────────────────────────────────────────
    const { scale } = useSpring({
        scale: hovered ? 0.5 : 0.4,
        config: { tension: 300, friction: 20 },
    });

    const handlePointerOver = () => {
        setLocalHovered(true);
        if (setHovered) setHovered(true);
        document.body.style.cursor = 'pointer';
    };

    const handlePointerOut = () => {
        setLocalHovered(false);
        if (setHovered) setHovered(false);
        document.body.style.cursor = 'default';
    };

    return (
        <Select enabled={hovered}>
            <a.mesh
                ref={ref}
                {...props}
                scale={scale}
                userData={{ type: 'interactable', name: 'ArcadeMachine' }}
                onClick={onClick}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
            >
                <primitive object={scene} />

                {/* Screen overlay — sits on the front face of the arcade cabinet */}
                <mesh position={SCREEN_POS} rotation={SCREEN_ROT}>
                    <planeGeometry args={[SCREEN_W, SCREEN_H]} />
                    {DEBUG
                        ? <meshBasicMaterial color={0xff2222} toneMapped={false} />
                        : <meshBasicMaterial map={screenTexture} toneMapped={false} />
                    }
                </mesh>

            </a.mesh>
        </Select>
    );
}

useGLTF.preload('/Models/ArcadeMachine.gltf');

export default ArcadeMachine;
