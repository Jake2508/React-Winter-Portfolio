// Data for Work Sections! 
// Add a new ID for new jobs & Style in CSS

export const workData = [
        {
            id: 1,
            title: 'QA Tester',
            company: 'West Pier Studio',
            miniTitle: '2024-Present',
            subtitle: 'Deck, Pergola & Fence Planner',
            media: [
                { type: 'embed', url: 'https://www.youtube.com/embed/XT3VvS794iY?si=QxvNAALcfBs0oGyg' }, 
                { type: 'image', url: '/Images/Work/deck-promo-1.jpg' },
                { type: 'image', url: '/Images/Work/deck-promo-2.jpg' },
                { type: 'image', url: '/Images/Work/deck-promo-3.jpg' },
                { type: 'embed', url: 'https://www.youtube.com/embed/EVf7U4epsxs?si=cM60qEAxqth9kPqj' }, 
                { type: 'image', url: '/Images/Work/pergola-promo-1.jpg' }, 
                { type: 'image', url: '/Images/Work/pergola-promo-2.jpg' }, 
                { type: 'image', url: '/Images/Work/pergola-promo-3.jpg' }, 
                { type: 'embed', url: 'https://www.youtube.com/embed/EVf7U4epsxs?si=cM60qEAxqth9kPqj' }, 
                { type: 'image', url: '/Images/Work/fence-promo-1.jpg' }, 
                { type: 'image', url: '/Images/Work/fence-promo-2.jpg' }, 
                { type: 'image', url: '/Images/Work/fence-promo-3.jpg' }, 
            ],
            technologies: ['TestRail', 'Jira', 'Confluence', 'Unity', 'C#', 'NUnit', 'Postman'],
            description: ['AstroHaul is a 2D retro arcade game created in Unity based on the classic Asteroids game. This project was created as part of the Typical Game Jam (within 3 days).',

                'My goal for this project was to create a classic I enjoyed and give it a fresh look. I chose to utilise volatile gravitational fields and collection mechanics.',
    
                'To achieve this, I set out to make a gravitation push/pull effect usable for all objects. The idea was to add uncertainty while maintaining responsive feedback ' +
                'so users could understand these forces. '
                ],
            links: [
                { label: 'Website', url: 'https://www.westpierstudio.com/' },
                { label: 'Deck Planner', url: 'https://deckplanner.strongtie.com/ols/surface/contentbuilder/deckplanner?' },
                { label: 'Pergola Planner', url: 'https://deckplanner.strongtie.com/ols/surface/contentbuilder/pergolaplanner?' },
                { label: 'Fence Planner', url: 'https://deckplanner.strongtie.com/ols/surface/contentbuilder/fenceplanner?' },
            ],
        },
        {
            id: 2,
            title: 'QA Technician',
            company: 'Codemasters',
            miniTitle: '2019-2020',
            subtitle: 'F1 Mobile Racing Project',
            media: [
                { type: 'embed', url: 'https://www.youtube.com/embed/l37bxiB65fs?si=RF13sgJ6azFzFFkP' },
                { type: 'image', url: '/Images/Work/f1-Promo-4.jpg' },
                { type: 'image', url: '/Images/Work/f1-Promo-8.jpg' }, 
                { type: 'image', url: '/Images/Work/f1-Promo-9.png' },
                { type: 'image', url: '/Images/Work/f1-Promo-7.png' }, 
                { type: 'image', url: '/Images/Work/f1-Promo-6.jpg' },
                { type: 'image', url: '/Images/Work/f1-Promo-5.jpg' },
            ],
            technologies: ['Jira', 'Confluence', 'TestFlight', 'GameSparks'],
            description: ['F1 Mobile Racing was a mobile project for iOS and Android that I worked on as a QA technician. The team consisted of 4-5 members, though we ' + 
                'occasionally assisted other teams on larger console projects such as Grid.',

                'Key responsibilities included:',
                '- Testing game functionality, visuals, localisation and monetisation ',
                '- Meeting short deadlines for timely updates on the Apple Store and Google Play Store ',
                '- Identified, documented, and reported bugs via Atlassian suite software ',
                '- Communicated with the design team to provide feedback and resolve issues ',
                '- Utilised GameSparks to capture error logs, detect in-game cheating and add currency/vehicles to accounts for testing ',
    
                ],
            links: [
                { label: 'Website', url: 'https://www.ea.com/ea-studios/codemasters' },
                { label: 'App Link', url: 'https://apkpure.com/f1-mobile-i/com.codemasters.F1Mobile' },
                { label: 'Project Officially Closed', url: 'https://codemasters.helpshift.com/hc/en/3-f1-mobile-racing/faq/736-i-can-t-find-the-game-in-the-app-play-store/' },
            ],
        },
        // Add more work items here...
    ];
    