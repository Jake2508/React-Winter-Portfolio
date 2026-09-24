import React, { useEffect, useRef, useState } from 'react';

/*
  Dev-only tuning panel for camera framing and the world-space title.

  index.jsx gates this on import.meta.env.DEV, so Vite strips the whole thing
  from production builds. Two ways to work:

    1. Orbit and scroll the scene by hand, watch the LIVE readout, then hit
       Copy once the framing looks right.
    2. Drag the sliders to drive the camera directly. Turn auto-rotate off
       first, or it will keep spinning away from whatever you set.
*/

const STYLES = `
.dbgPanel,
.dbgFab {
    position: fixed;
    top: 12px;
    left: 12px;
    z-index: 50;
    font-family: var(--font-mono), monospace;
    color: #d8e6f5;
    pointer-events: auto;
    user-select: none;
}

.dbgFab {
    padding: 6px 10px;
    background: rgba(6, 16, 30, 0.9);
    border: 1px solid rgba(255, 140, 60, 0.5);
    color: #ff9c4a;
    font-size: 9.5px;
    letter-spacing: 1.4px;
    cursor: pointer;
}

.dbgPanel {
    width: 272px;
    max-height: calc(100dvh - 24px);
    overflow-y: auto;
    background: rgba(6, 16, 30, 0.93);
    border: 1px solid rgba(255, 140, 60, 0.45);
    backdrop-filter: blur(8px);
    box-shadow: 0 12px 34px rgba(0, 0, 0, 0.55);
}

.dbgHeader {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 10px;
    background: rgba(255, 140, 60, 0.1);
    border-bottom: 1px solid rgba(255, 140, 60, 0.3);
}

.dbgTitle {
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: #ff9c4a;
}

.dbgDevOnly {
    font-size: 8.5px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
}

.dbgClose {
    margin-left: auto;
    width: 18px;
    height: 18px;
    display: grid;
    place-items: center;
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #d8e6f5;
    font-size: 12px;
    line-height: 1;
    cursor: pointer;
}

.dbgSection {
    padding: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.dbgSectionHead {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 9.5px;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.75);
}

.dbgChecks {
    display: flex;
    gap: 10px;
}

.dbgCheck {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 9px;
    letter-spacing: 0.6px;
    text-transform: none;
    color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
}

.dbgCheck input { accent-color: #ff9c4a; }
.dbgCheck input:disabled { opacity: 0.4; }
.dbgCheck:has(input:disabled) { opacity: 0.45; }

/* -- slider rows -- */
.dbgRow {
    display: grid;
    grid-template-columns: 30px 1fr 56px;
    gap: 7px;
    align-items: center;
    margin-bottom: 5px;
}

.dbgMuted { opacity: 0.4; }

.dbgSubHead {
    margin: 9px 0 5px;
    font-size: 8.5px;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
}

.dbgLabel {
    font-size: 9.5px;
    letter-spacing: 0.6px;
    color: rgba(255, 255, 255, 0.55);
}

.dbgRow input[type="range"] {
    width: 100%;
    accent-color: #ff9c4a;
    cursor: pointer;
}

.dbgNumber {
    width: 100%;
    padding: 3px 4px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.14);
    color: #d8e6f5;
    font-family: inherit;
    font-size: 9.5px;
}

/* -- live readout -- */
.dbgReadout {
    display: flex;
    align-items: baseline;
    gap: 7px;
    margin: 9px 0 0;
    padding: 6px 7px;
    background: rgba(255, 255, 255, 0.05);
    border-left: 2px solid rgba(255, 140, 60, 0.6);
}

.dbgReadoutLabel {
    font-size: 8.5px;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: #ff9c4a;
}

.dbgReadout code {
    font-family: inherit;
    font-size: 9.5px;
    color: #d8e6f5;
}

.dbgNote {
    margin: 7px 0 0;
    font-size: 9px;
    line-height: 1.45;
    color: rgba(255, 255, 255, 0.55);
}

.dbgWarn {
    margin: 7px 0 0;
    font-size: 9px;
    line-height: 1.45;
    color: #ffc97a;
}

/* -- buttons -- */
.dbgCopy,
.dbgReset {
    width: 100%;
    margin-top: 9px;
    padding: 6px;
    background: rgba(255, 140, 60, 0.14);
    border: 1px solid rgba(255, 140, 60, 0.45);
    color: #ff9c4a;
    font-family: inherit;
    font-size: 9.5px;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.15s ease;
}

.dbgCopy:hover,
.dbgReset:hover { background: rgba(255, 140, 60, 0.26); }

.dbgReset {
    margin: 0;
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    background: none;
    color: rgba(255, 255, 255, 0.5);
}
`;

const DebugPanel = ({ settings, onChange, readout, defaults }) => {
    const [open, setOpen] = useState(true);
    const [live, setLive] = useState({ x: 0, y: 0, z: 0, fov: 0, far: 0, distance: 0, minDistance: 0, maxDistance: 0 });
    const [copied, setCopied] = useState('');

    // Poll the ref rather than re-rendering on every frame of the orbit
    useEffect(() => {
        const id = setInterval(() => setLive({ ...readout.current }), 120);
        return () => clearInterval(id);
    }, [readout]);

    const set = (key) => (value) => onChange({ ...settings, [key]: value });

    const copyTimer = useRef();
    useEffect(() => () => clearTimeout(copyTimer.current), []);

    const copy = (label, text) => {
        navigator.clipboard?.writeText(text);
        setCopied(label);
        clearTimeout(copyTimer.current);
        copyTimer.current = setTimeout(() => setCopied(''), 1400);
    };

    const cameraSnippet =
        `const CAMERA = { fov: ${round(live.fov)}, near: 1, far: ${round(live.far)}, position: [${round(live.x)}, ${round(live.y)}, ${round(live.z)}] };
`
        + `const ORBIT_TARGET = [${round(settings.targetX)}, ${round(settings.targetY)}, ${round(settings.targetZ)}];`;

    const titleSnippet =
        `export const TITLE_DEFAULTS = {\n`
        + `    anchor: [${round(settings.titleX)}, ${round(settings.titleY)}, ${round(settings.titleZ)}],\n`
        + `    rise: ${round(settings.titleRise)},\n`
        + `    size: ${round(settings.titleSize)},\n};`;

    if (!open) {
        return (
            <>
                <style>{STYLES}</style>
                <button type="button" className="dbgFab" onClick={() => setOpen(true)}>
                    DEBUG
                </button>
            </>
        );
    }

    return (
        <>
        <style>{STYLES}</style>
        <div className="dbgPanel">
            <header className="dbgHeader">
                <span className="dbgTitle">Scene tuning</span>
                <span className="dbgDevOnly">dev only</span>
                <button type="button" className="dbgClose" onClick={() => setOpen(false)}>–</button>
            </header>

            {/* -- Camera -- */}
            <section className="dbgSection">
                <div className="dbgSectionHead">
                    <span>Camera</span>
                    <span className="dbgChecks">
                        <label className="dbgCheck">
                            <input
                                type="checkbox"
                                checked={settings.orbitEnabled}
                                onChange={(e) => set('orbitEnabled')(e.target.checked)}
                            />
                            orbit
                        </label>
                        <label className="dbgCheck">
                            <input
                                type="checkbox"
                                checked={settings.autoRotate}
                                disabled={!settings.orbitEnabled}
                                onChange={(e) => set('autoRotate')(e.target.checked)}
                            />
                            auto-rotate
                        </label>
                    </span>
                </div>

                <Row label="fov"  value={settings.fov}  min={15} max={75}  step={1}    onChange={set('fov')} />
                <Row label="x"    value={settings.camX} min={-30} max={30} step={0.1}  onChange={set('camX')} />
                <Row label="y"    value={settings.camY} min={-5}  max={20} step={0.1}  onChange={set('camY')} />
                <Row label="z"    value={settings.camZ} min={-30} max={30} step={0.1}  onChange={set('camZ')} />

                <div className="dbgSubHead">look at</div>
                <Row label="tx" value={settings.targetX} min={-8} max={8} step={0.1} onChange={set('targetX')} />
                <Row label="ty" value={settings.targetY} min={-6} max={4} step={0.1} onChange={set('targetY')} />
                <Row label="tz" value={settings.targetZ} min={-8} max={8} step={0.1} onChange={set('targetZ')} />

                <div className="dbgReadout">
                    <span className="dbgReadoutLabel">live</span>
                    <code>
                        {round(live.x)}, {round(live.y)}, {round(live.z)}
                        {'  ·  fov '}{round(live.fov)}
                        {'  ·  dist '}{round(live.distance)}
                        {live.maxDistance ? `  ·  zoom ${round(live.minDistance)}–${round(live.maxDistance)}` : ''}
                    </code>
                </div>

                {!settings.orbitEnabled && (
                    <p className="dbgNote">
                        Orbit off — drag and scroll are disabled and auto-rotate is frozen,
                        so the sliders set the camera exactly with no distance clamping.
                    </p>
                )}

{/* Limits are set by ResponsiveCamera from the window shape, so read them live */}
                {settings.orbitEnabled && live.maxDistance > 0 && live.distance > live.maxDistance && (
                    <p className="dbgWarn">
                        Past the current maxDistance ({round(live.maxDistance)}) — OrbitControls
                        will pull back in. The range scales with the window in ResponsiveCamera.jsx.
                    </p>
                )}
                {settings.orbitEnabled && live.minDistance > 0 && live.distance < live.minDistance && (
                    <p className="dbgWarn">
                        Inside the current minDistance ({round(live.minDistance)}) — it will push
                        back out.
                    </p>
                )}

                <button type="button" className="dbgCopy" onClick={() => copy('camera', cameraSnippet)}>
                    {copied === 'camera' ? 'Copied' : 'Copy camera + target'}
                </button>
            </section>

            {/* -- Title -- */}
            <section className="dbgSection">
                <div className="dbgSectionHead">
                    <span>Title “Jake Rose”</span>
                    <label className="dbgCheck">
                        <input
                            type="checkbox"
                            checked={settings.titleVisible}
                            onChange={(e) => set('titleVisible')(e.target.checked)}
                        />
                        show
                    </label>
                </div>

<div className={settings.titleVisible ? undefined : 'dbgMuted'}>
                    <Row label="x"    value={settings.titleX}    min={-12} max={12} step={0.1}  disabled={!settings.titleVisible} onChange={set('titleX')} />
                    <Row label="y"    value={settings.titleY}    min={-6}  max={6}  step={0.05} disabled={!settings.titleVisible} onChange={set('titleY')} />
                    <Row label="z"    value={settings.titleZ}    min={-12} max={12} step={0.1}  disabled={!settings.titleVisible} onChange={set('titleZ')} />
                    <Row label="rise" value={settings.titleRise} min={0}   max={4}  step={0.02} disabled={!settings.titleVisible} onChange={set('titleRise')} />
                    <Row label="size" value={settings.titleSize} min={0.1} max={2}  step={0.01} disabled={!settings.titleVisible} onChange={set('titleSize')} />
                </div>

                <button type="button" className="dbgCopy" onClick={() => copy('title', titleSnippet)}>
                    {copied === 'title' ? 'Copied' : 'Copy TITLE_DEFAULTS'}
                </button>
            </section>

            <button type="button" className="dbgReset" onClick={() => onChange(defaults)}>
                Reset to committed values
            </button>
        </div>
        </>
    );
};


const Row = ({ label, value, min, max, step, disabled, onChange }) => (
    <label className="dbgRow">
        <span className="dbgLabel">{label}</span>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(Number(e.target.value))}
        />
        <input
            type="number"
            className="dbgNumber"
            min={min}
            max={max}
            step={step}
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(Number(e.target.value))}
        />
    </label>
);


const round = (n) => Math.round((n ?? 0) * 100) / 100;


export default DebugPanel;
