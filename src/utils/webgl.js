/*
  Probed once, with a throwaway canvas, before the real one mounts. A browser
  that cannot hand out a context now will not start doing so later in the
  session, and probing repeatedly would leak contexts — browsers cap how many
  can exist at a time, and a leaked one can cost the scene its own.

  ?nowebgl on the URL forces the fallback, so the still and the HUD over it can
  be checked on a machine that supports WebGL perfectly well.
*/
let supported = null;

export const hasWebGL = () => {
    if (supported !== null) return supported;

    if (typeof window !== 'undefined' && window.location.search.includes('nowebgl')) {
        supported = false;
        return supported;
    }

    try {
        const canvas = document.createElement('canvas');
        supported = Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch {
        // Some privacy modes throw rather than returning null
        supported = false;
    }

    return supported;
};
