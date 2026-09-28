/*
  Bridges the design tokens into the 3D scene. styles/tokens.css is the source
  of truth; three.js cannot read CSS, so this pulls the same custom properties
  off :root at runtime. Fallbacks mirror tokens.css for the case where a scene
  module evaluates before the stylesheet applies.
*/
const FALLBACKS = {
    gold:     '#FFD700',
    blue:     '#85C1E9',
    blueText: '#a9d5f3',
    green:    '#7fffc4',
    onGold:   '#001428',
    ground:   '#001226',
    hairline: '#1b3a55',
    outline:  '#04203c',
    white:    '#ffffff',
};

const TOKEN_NAMES = {
    gold:     '--accent-gold',
    blue:     '--accent-blue',
    blueText: '--accent-blue-text',
    green:    '--accent-green',
    onGold:   '--on-gold',
    ground:   '--screen-ground',
    hairline: '--screen-hairline',
    outline:  '--scene-outline',
    white:    '--text-white',
};

const read = () => {
    if (typeof window === 'undefined' || !document.documentElement) return { ...FALLBACKS };

    const root = getComputedStyle(document.documentElement);
    const missing = [];

    const resolved = Object.fromEntries(
        Object.entries(TOKEN_NAMES).map(([key, token]) => {
            const value = root.getPropertyValue(token).trim();
            if (!value) missing.push(token);
            return [key, value || FALLBACKS[key]];
        }),
    );

    // Falling back means the scene and panel can drift apart, and in dev it
    // only happens if the tokens.css import moved. Worth shouting about.
    if (missing.length) {
        console.warn(
            `[theme] tokens unavailable, using fallbacks: ${missing.join(', ')}. `
            + 'Check that styles/tokens.css is imported first in index.jsx.',
        );
    }

    return resolved;
};

export const COLOURS = read();
