import { projectData } from './projectData.js';

// Shared panel data — identity, availability, timeline, stack & contact details.
// Everything the header, About tab, Contact tab and footer readout derive from.


// -- Identity -- //
export const profile = {
    name: 'Jake Rose',
    roles: 'Software Engineer · Games · QA',
    location: 'London, UK · GMT',
    intro: "Hi I'm Jake, I'm a C# developer experienced building internal tools, services and " +
        'automation pipelines. I\u2019ve worked across software, games and QA with an interest in ' +
        'creative software.',
    // Drop a square headshot here to replace the monogram fallback in the About tab.
    portrait: '/Images/General/portrait.jpg',
};


// -- Availability -- //
// Flip `availability` to change the tab-bar status without touching markup.
export const AVAILABILITY = {
    AVAILABLE:    { colour: '#7fffc4', label: 'Available for work' },
    OPEN_TO_CHAT: { colour: '#85C1E9', label: 'Working, open to chat' },
    HIDDEN:       null,
};

export const availability = 'AVAILABLE';


// -- Professional experience (was the Work tab) -- //
export const experience = [
    { years: '2025-26', role: 'Software Engineer in Test', company: 'Smartodds, London' },
    { years: '2024-25', role: 'QA Tester',                 company: 'West Pier Studio, Brighton' },
    { years: '2023-24', role: 'Service Administrator',     company: 'IPG Photonics, Coventry' },
    { years: '2019-20', role: 'QA Technician',             company: 'Codemasters, Southam' },
];


// -- Education -- //
export const education = {
    years: '2020-23',
    course: 'BSc (Hons) Computer Games Design & Programming',
    institution: 'Staffordshire University',
    award: 'First Class Honours Award (82%)',
    url: 'https://www.staffs.ac.uk/course/computer-games-design-programming-bsc',
    logo: '/Images/General/staffs-logo.png',
};


// -- Tech stack -- //
// Ordered languages -> tools -> creative, rendered as one continuous run.
export const techStack = [
    'C#', '.NET', 'SQL', 'JavaScript', 'Blazor', 'HTML', 'CSS',
    'Azure DevOps', 'Kubernetes', 'Docker', 'CI/CD', 'Git', 'Postman', 'Grafana', 'Kibana',
    'Unity', 'Unreal Engine', 'Blender', 'Blueprint',
];


// -- Contact -- //
export const contactIntro =
    "Thanks for looking through, I\u2019m open to roles in software development, games and QA. " +
    'Email is the quickest way to reach me, or call direct.';

// Labels name the outcome rather than the gesture: "tap" is phone-only,
// "click" is desktop-only, and the tiles already read as buttons.
export const contactPrimary = [
    { label: 'Email · Opens mail app', value: 'rosejake400@gmail.com', href: 'mailto:rosejake400@gmail.com' },
    { label: 'Phone · Starts a call',  value: '07561 042931',          href: 'tel:+447561042931' },
];

export const socials = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/jake-rose123/' },
    { label: 'GitHub',   url: 'https://github.com/Jake2508' },
    { label: 'itch.io',  url: 'https://jake12341234.itch.io/' },
];

export const cv = {
    title: 'Jake Rose — CV',
    meta: 'PDF · 2 pages',
    url: '/Images/General/Jake-Rose-CV.pdf',
    icon: '/Images/General/pdf-icon2.png',
};


// -- Preload set -- //
// Every image the panel can show without scrolling or navigating. Warmed
// during the loading screen so nothing pops in once the panel opens.
export const panelImages = [
    education.logo,
    cv.icon,
    ...projectData.map((project) => project.previewImage),
];
