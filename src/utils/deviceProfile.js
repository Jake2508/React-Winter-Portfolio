/*
  Trades fidelity for fill-rate only where it will not be noticed. Read once at
  module load: a phone does not become a desktop, and multisampling cannot
  change without rebuilding the effect composer.
*/
const coarsePointer = typeof window !== 'undefined'
    && window.matchMedia?.('(pointer: coarse)').matches;

const narrowScreen = typeof window !== 'undefined'
    && window.matchMedia?.('(max-width: 900px)').matches;

// Both signals, not either: a coarse pointer alone catches touchscreen
// laptops, a narrow window alone catches a desktop browser dragged small.
const IS_HANDHELD = Boolean(coarsePointer && narrowScreen);

// DPR cap. Every post pass pays per pixel, and phone density hides the
// difference, so 1.5 there costs under half the fragments for the same look.
export const DPR_RANGE = typeof window === 'undefined'
    ? [1, 2]
    : [1, Math.max(1, Math.min(IS_HANDHELD ? 1.5 : 2, window.devicePixelRatio))];

// MSAA samples. This is the scene's only anti-aliasing (the context runs
// antialias:false, which does not apply through an offscreen buffer), so it
// stays on for desktop 1x displays. Handhelds are dense enough to hide it.
export const MULTISAMPLING = IS_HANDHELD ? 0 : 2;
