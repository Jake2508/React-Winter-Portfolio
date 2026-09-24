import React from 'react';
import '../styles/SceneHUD.css';
import { profile } from '../data/panelData.js';

const NAV_TABS = ['about', 'projects', 'contact'];

/*
  Screen-space corners over the diorama. The whole group fades out when the
  portfolio panel opens, so the HUD and the panel are never both on screen.
  There is no camera hint: the canvas already carries a grab cursor.

  The name shares the panel's Lexend face, styled bolder and uppercase for a
  HUD readout rather than matching the panel header's sentence-case treatment.
  Everything else is mono, as the panel's labels are.
*/
const SceneHUD = ({ visible, onNavigate }) => (
    <div className={`hud ${visible ? 'hudVisible' : ''}`} aria-hidden={!visible}>

        <div className="hudCorner hudTopLeft">
            <p className="hudName">{profile.name}</p>
            <p className="hudRoles">{profile.roles}</p>
        </div>

        <nav className="hudCorner hudTopRight hudNav" aria-label="Portfolio sections">
            {NAV_TABS.map((tab) => (
                <button
                    key={tab}
                    type="button"
                    className="hudNavItem"
                    onClick={() => onNavigate(tab)}
                    tabIndex={visible ? 0 : -1}
                >
                    {tab}
                </button>
            ))}
        </nav>

    </div>
);


export default SceneHUD;
