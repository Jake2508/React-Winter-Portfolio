import React from 'react';

/*
  Stands in for the diorama when WebGL is unavailable or the context is lost.
  A still of the same scene, captured with the HUD hidden, so the real HUD
  renders over it and the nav still opens the panel — the site loses the
  orbiting, not the content.
*/
const SceneFallback = () => (
    <div
        className="sceneFallback"
        role="img"
        aria-label="Jake Rose's portfolio: a low-poly arcade machine on a snowy island"
    >
        <p className="sceneFallbackNote">3D view unavailable on this device</p>
    </div>
);


export default SceneFallback;
