// Cross-tab data only — anything used by just one tab lives in that tab's own
// *Data.js file instead (aboutData.js, contactData.js, projectData.js).
// What's left here genuinely doesn't belong to a single tab:
//   - profile + availability drive the panel header/tab bar and the scene HUD
//   - socials is shown on Contact but also linked from the Projects closing line
// (The preload list lives in index.jsx, not here — it needs all three tabs'
// data files, and they import profile/socials from this one, so building it
// here would make the imports circular.)


// -- Identity -- //
export const profile = {
    name: 'Jake Rose',
    roles: 'Software Engineer · Games · QA',
    location: 'London, UK · GMT',
    portrait: '/Images/General/avatar.png',
};


// -- Availability -- //
// Flip `availability` to change the tab-bar status without touching markup.
export const AVAILABILITY = {
    AVAILABLE:    { colour: '#5FE08F', label: 'Available for work' },
    OPEN_TO_CHAT: { colour: '#85C1E9', label: 'Working, open to chat' },
    HIDDEN:       null,
};

export const availability = 'AVAILABLE';


// -- Socials -- //
export const socials = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/jake-rose123/', handle: 'in/jake-rose123' },
    { label: 'GitHub',   url: 'https://github.com/Jake2508/',              handle: '@Jake2508' },
    { label: 'itch.io',  url: 'https://jake12341234.itch.io/',             handle: 'jake12341234' },
];
