// Data for Projects Sections! 
// Add a new ID for new projects & Style in CSS

export const projectData = [
            {
                // IN PROGRESS
                id: 1,
                title: 'Portfolio',
                miniTitle: '2024',
                subtitle: 'React Three Fiber Application',
                media: [
                    { type: 'image', url: '/Images/portfolio-v1.PNG' },
                    { type: 'embed', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    
                ],
                technologies: ['React', 'ThreeJs', 'JavaScript', 'HTML', 'CSS', 'Blender'],
                description: ['AstroHaul is a 2D retro arcade game created in Unity based on the classic Asteroids game. This project was created as part of the Typical Game Jam.',
    
                    'My goal for this project was to create a classic I enjoyed and give it a fresh look. I chose to utilise volatile gravitational fields and collection mechanics.',
        
                    'To achieve this, I set out to make a gravitation push/pull effect usable for all objects. The idea was to add uncertainty while maintaining responsive feedback ' +
                    'so users could understand these forces. '
                ],
                links: [
                    { label: 'GitHub', url: 'https://github.com/your-portfolio' },
                    { label: 'Live Demo', url: 'https://your-portfolio.com' },
                ],
            },
            {
                // TODO
                id: 2,
                title: 'Procedural Island',
                miniTitle: '2024',
                subtitle: 'Three.js Visualization',
                media: [
                    { type: 'image', url: '/Images/portfolio-v1.PNG' },
                    { type: 'embed', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    
                ],
                technologies: ['React', 'Three.js', 'JavaScript', 'CSS'],
                description: ['AstroHaul is a 2D retro arcade game created in Unity based on the classic Asteroids game. This project was created as part of the Typical Game Jam.',
    
                    'My goal for this project was to create a classic I enjoyed and give it a fresh look. I chose to utilise volatile gravitational fields and collection mechanics.',
        
                    'To achieve this, I set out to make a gravitation push/pull effect usable for all objects. The idea was to add uncertainty while maintaining responsive feedback ' +
                    'so users could understand these forces. '
                ],
                links: [
                    { label: 'GitHub', url: 'https://github.com/your-portfolio' },
                    { label: 'Live Demo', url: 'https://your-portfolio.com' },
                ],
            },
            {
                id: 3,
                title: 'Tankeo Drift',
                miniTitle: '2023-2024',
                subtitle: 'Endless Action Roguelike',
                media: [
                    { type: 'embed', url: 'https://www.youtube.com/embed/MCiUNEL0EaY?si=5YdXJN5stWTy' },
                    { type: 'image', url: '/Images/Games/Tankeo-Promo2.png' },
                    { type: 'image', url: '/Images/Games/Tankeo-Promo1.png' },
                    { type: 'image', url: '/Images/Games/Tankeo-Promo3.png' },
                    { type: 'image', url: '/Images/Games/Tankeo-Promo4.png' },
                    { type: 'image', url: '/Images/Games/Tankeo-Promo5.jpg' },
                ],
                technologies: ['Unity', 'C#', 'Blender', 'Photoshop'],
                description: ['Tankeo Drift is an action-packed rogue-like game built in Unity, where you battle endless waves of enemies, gather experience, and upgrade your tank as you progress.',
    
                    'The aim of this project was to develop an endless rogue-like experience, inspired by Vampire Survivor, with a focus on an engaging upgrade system. ' +
                    'Additionally, I wanted to improve my 3D modelling skills.',
        
                    'To achieve this, I implemented a procedurally generated environment. The system uses a 9-tile grid of prefabs that dynamically update based on the ' +
                    'players position, creating the illusion of an infinite level.'
                ],
                links: [
                    { label: 'GitHub', url: 'https://github.com/your-portfolio' },
                    { label: 'Download Game', url: 'https://jake12341234.itch.io/tankeo-drift' },
                ],
            },
            {
                // Rework Title Image & Add Enemy Image
                id: 4,
                title: 'Assembly Required',
                miniTitle: '2022',
                subtitle: 'Farming Roguelike Exploration',
                media: [
                    { type: 'embed', url: 'https://www.youtube.com/embed/AQUKyF2cjNM?si=rlF7Eh-CtIbXYHyh' },
                    { type: 'image', url: '/Images/Games/Assembly-Promo1.png' },
                    { type: 'image', url: '/Images/Games/Assembly-Promo3.png' },
                    { type: 'image', url: '/Images/Games/Assembly-Promo4.png' },
                    { type: 'image', url: '/Images/Games/Assembly-Promo2.png' },
                    { type: 'image', url: '/Images/Games/Assembly-Promo5.jpg' },
                    { type: 'image', url: '/Images/Games/Assembly-Promo6.png' },
                ],
                technologies: ['Unreal Engine 4', 'Blueprint', 'Jira'],
                description: ['Assembly Required is a third-person, farming rogue-like sci-fi exploration game developed in Unreal Engine 4. This team project was ' +
                    'completed over a 6-week development period during my time at university.',
    
                    'As a junior tech, I worked in a tech team of three, focusing on gaining hands-on experience while collaborating closely with a cross-discipline team. ',
        
                    'My contributions included developing core features such as the farming tool prototypes, refuel station, melee enemy, acid pools, level transitions, UI ' +
                    'implementation, sound manager, and reviewing level designs. I also assisted with bug fixing across various areas of the game.' 
                ],
                links: [
                    { label: 'GitHub', url: 'https://github.com/TomWilkinsonGames/RoboFarm' },
                    { label: 'Download Game', url: 'https://tomwilkinson.itch.io/assembly-required' },
                ],
            },
            {
                // MAYBE ADD CODE REPO - Besides Complete
                id: 5,
                title: 'Deliberation',
                miniTitle: '2024',
                subtitle: 'A* Pathfinding Prototype',
                media: [
    
                    { type: 'embed', url: 'https://www.youtube.com/embed/aU5eYhggCLU?si=ILWADHAL0GvOTq-f' },
                    { type: 'image', url: '/Images/Games/Deliberation-Promo1.jpg' }, 
                    { type: 'image', url: '/Images/Games/Deliberation-PromoT1.png' }, 
                    { type: 'image', url: '/Images/Games/Deliberation-PromoT2.png' }, 
                    { type: 'image', url: '/Images/Games/Deliberation-PromoG.gif' }, 
                ],
                technologies: ['Unity', 'A* Pathfinding', 'Aseprite', 'Grid System'],
                description: ['Deliberation is a prototype puzzle game built in Unity that showcases A* pathfinding. Click to select your characters target position ' + 
                    'and watch the pathfinding in action.',
    
                    'The goal of this project was to explore different pathfinding algorithms, such as A*, Dijkstra, Depth-first, and Breadth-first and integrate them ' + 
                    'with lighting mechanics to create engaging puzzles. ',
        
                    'To achieve this, I expanded on an A* project I developed during university, incorporating pixel art and animations to bring the game to life.'
                ],
                links: [
                    { label: 'GitHub', url: 'https://github.com/Jake2508/Deliberation/tree/main/Assets/Deliberation' },
                    { label: 'Live Demo', url: 'https://your-portfolio.com' },
                ],
            },
            {
                // COMPLETE
                id: 6,
                title: 'AstroHaul',
                miniTitle: '2024',
                subtitle: 'Asteroids Gravity Chaos',
                media: [
                    { type: 'embed', url: 'https://www.youtube.com/embed/8v2ZYKTqcxE?si=w1D3grpEaoYvvMXJ' },
                    { type: 'image', url: '/Images/Games/Asteroids-Promo1.jpg' },
                    { type: 'image', url: '/Images/Games/Asteroids-Promo2.jpg' },
                ],
                technologies: ['Unity', 'C#', 'Aseprite'],
                description: ['AstroHaul is a 2D retro arcade game created in Unity based on the classic Asteroids game. This project was created as part of the Typical Game Jam (within 3 days).',
    
                'My goal for this project was to create a classic I enjoyed and give it a fresh look. I chose to utilise volatile gravitational fields and collection mechanics.',
    
                'To achieve this, I set out to make a gravitation push/pull effect usable for all objects. The idea was to add uncertainty while maintaining responsive feedback ' +
                'so users could understand these forces. '
                ],
                links: [
                    { label: 'GitHub', url: 'https://github.com/Jake2508/Asteroids/tree/main/Assets/Asteroids%20Game' },
                    { label: 'Typical Game Jam', url: 'https://itch.io/jam/typical-game-jam' },
                    { label: 'Play Game', url: 'https://jake12341234.itch.io/astrohaul' },
                ],
            },
    ];