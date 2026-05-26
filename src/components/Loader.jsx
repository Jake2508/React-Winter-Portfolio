import React, { useState, useEffect, useRef, useMemo } from 'react';
import '../styles/Loader.css';

const R = 115;
const N = 6;

const VERTS = Array.from({ length: N }, (_, i) => {
    const a = (i * 60 - 90) * (Math.PI / 180);
    return { x: R * Math.cos(a), y: R * Math.sin(a) };
});

const EDGES = VERTS.map((v, i) => {
    const w = VERTS[(i + 1) % N];
    const dx = w.x - v.x, dy = w.y - v.y;
    return { x1: v.x, y1: v.y, x2: w.x, y2: w.y, len: Math.sqrt(dx * dx + dy * dy) };
});

const STATUS = [
    [0,  'Initializing...'],
    [20, 'Loading assets...'],
    [50, 'Building the scene...'],
    [82, 'Finalizing...'],
];

function getStatus(p) {
    return STATUS.filter(([t]) => p >= t).pop()[1];
}

const Loader = ({ progress }) => {
    const [display, setDisplay] = useState(0);
    const [pulsing, setPulsing] = useState({});
    const [completed, setCompleted] = useState(false);
    const progressRef = useRef(0);
    const displayRef  = useRef(0);
    const prevEpRef   = useRef(0);
    const rafRef      = useRef(null);

    // Keep a live ref to the latest progress prop
    useEffect(() => { progressRef.current = progress; }, [progress]);

    // Single frame-rate-independent RAF loop that smoothly advances display
    useEffect(() => {
        let lastTs = null;

        const frame = (ts) => {
            if (lastTs !== null) {
                const dt = Math.min((ts - lastTs) / 1000, 0.1);
                const lag = progressRef.current - displayRef.current;
                if (lag > 0) {
                    // Steady at 30/s; accelerates when lag builds up
                    displayRef.current = Math.min(
                        progressRef.current,
                        displayRef.current + Math.max(30, lag * 5) * dt
                    );
                    setDisplay(Math.round(displayRef.current));
                }
            }
            lastTs = ts;
            rafRef.current = requestAnimationFrame(frame);
        };

        rafRef.current = requestAnimationFrame(frame);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    const ep = (display / 100) * N;

    // Trigger vertex pop when a new vertex crosses its activation threshold
    useEffect(() => {
        const prevEp = prevEpRef.current;

        for (let i = 1; i < N; i++) {
            if (ep >= i && prevEp < i) {
                const idx = i;
                setPulsing(p => ({ ...p, [idx]: true }));
                setTimeout(() => setPulsing(p => {
                    const { [idx]: _, ...rest } = p;
                    return rest;
                }), 600);
            }
        }

        if (display >= 100 && !completed) setCompleted(true);
        prevEpRef.current = ep;
    }, [display]);

    const spark = useMemo(() => {
        if (display >= 100) return null;
        const ei = Math.min(Math.floor(ep), N - 1);
        const t  = ep - ei;
        const e  = EDGES[ei];
        return { x: e.x1 + (e.x2 - e.x1) * t, y: e.y1 + (e.y2 - e.y1) * t };
    }, [display]);

    return (
        <div className="loading-screen">
            <div className="loader-wrap">
                <svg
                    className={`loader-svg${completed ? ' complete' : ''}`}
                    viewBox="-155 -155 310 310"
                >
                    {EDGES.map((e, i) => (
                        <line
                            key={i}
                            x1={e.x1} y1={e.y1}
                            x2={e.x2} y2={e.y2}
                            className="hex-line"
                            strokeDasharray={e.len}
                            strokeDashoffset={e.len * (1 - Math.max(0, Math.min(1, ep - i)))}
                        />
                    ))}

                    {spark && (
                        <circle cx={spark.x} cy={spark.y} r="4.5" className="hex-spark" />
                    )}

                    {VERTS.map((v, i) => (
                        <circle
                            key={i}
                            cx={v.x} cy={v.y}
                            r={ep >= i ? 7.5 : 4}
                            className={`hex-dot ${ep >= i ? 'active' : 'pending'}${pulsing[i] ? ' pop' : ''}`}
                        />
                    ))}
                </svg>

                <div className="loader-num">
                    <span className="loader-digits">{display}</span>
                    <span className="loader-pct">%</span>
                </div>
            </div>

            <p className="loader-status">{getStatus(display)}</p>
        </div>
    );
};

export default Loader;
