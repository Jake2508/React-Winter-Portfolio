// Data for Work Sections! 
// Add a new ID for new jobs - Styles are across the board 

export const workData = [
        {
            id: 1,
            title: 'QA Tester',
            company: 'West Pier Studio',
            miniTitle: '2024-Present',
            subtitle: 'Deck, Pergola & Fence Planner',
            previewImage: '/Images/Work/wps-promo-1.jpg', 
            media: [
                { type: 'embed', url: 'https://www.youtube.com/embed/XT3VvS794iY?si=QxvNAALcfBs0oGyg' }, 
                { type: 'image', url: '/Images/Work/deck-promo-1.jpg' },
                { type: 'image', url: '/Images/Work/deck-promo-2.jpg' },
                { type: 'image', url: '/Images/Work/deck-promo-3.jpg' },
                { type: 'embed', url: 'https://www.youtube.com/embed/EVf7U4epsxs?si=cM60qEAxqth9kPqj' }, 
                { type: 'image', url: '/Images/Work/pergola-promo-1.jpg' }, 
                { type: 'image', url: '/Images/Work/pergola-promo-2.jpg' }, 
                { type: 'image', url: '/Images/Work/pergola-promo-3.jpg' }, 
                { type: 'embed', url: 'https://www.youtube.com/embed/N5kmXCuNmaE' }, 
                { type: 'image', url: '/Images/Work/fence-promo-1.jpg' }, 
                { type: 'image', url: '/Images/Work/fence-promo-2.jpg' }, 
                { type: 'image', url: '/Images/Work/fence-promo-3.jpg' }, 
            ],
            technologies: ['Jira', 'Confluence', 'TestRail', 'Unity', 'C#', 'NUnit', 'Postman'],
            description: ['As a QA Tester on the Unity team at West Pier Studio, I work on core projects such as Deck, Pergola, and Fence Planner. My primary role is to ' +
                'collaborate within a two-person QA team, ensuring the quality of WebGL and mobile deployments for our client and associated partner integrations. ',

                'In addition to my core responsibilities, I have proactively sought opportunities to contribute to the programming aspects of our projects. This initiative ' +
                'led me to develop Unit Tests that support code refactoring and optimization. Utilising GitKraken I have submitted pull requests to BitBucket, with each ' + 
                'request reviewed by team leads to ensure it meets our coding standards.',
    
                'I was also entrusted with independently developing Automation Tests in C# for our three main applications. Leveraging Selenium WebDriver and NUnit, I ' + 
                'designed and executed unit tests, focusing on login and account registration workflows. This role provided valuable insights into automated testing with' + 
                'element selectors, enabling me to apply these skills creatively across multiple projects.'
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
            previewImage: '/Images/Work/f1-Promo-1.jpg', 
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
            description: ['F1 Mobile Racing is a mobile project for iOS and Android that I worked on at Codemasters, as a QA technician. The QA team consisted of ' + 
                '4-5 members, and we occasionally assisted other teams on larger console projects such as Grid.',

                'Key responsibilities included:',
                '- Testing game functionality, ui, localisation and monetisation ',
                '- Meeting short deadlines for timely updates on the Apple Store and Google Play Store ',
                '- Identified, documented, and reported bugs via Atlassian suite software ',
                '- Communicated with developers to provide feedback and resolve issues ',
                '- Utilised GameSparks tool to capture error logs, detect in-game cheating and use debug tools to add currency/vehicles to accounts for testing ',
    
                ],
            links: [
                { label: 'Website', url: 'https://www.ea.com/ea-studios/codemasters' },
                { label: 'App Link', url: 'https://apkpure.com/f1-mobile-i/com.codemasters.F1Mobile' },
                { label: 'Project Officially Closed', url: 'https://codemasters.helpshift.com/hc/en/3-f1-mobile-racing/faq/736-i-can-t-find-the-game-in-the-app-play-store/' },
            ],
        },
        // Add more work items here...
    ];
    