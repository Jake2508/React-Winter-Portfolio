// Data for Projects Sections! 
// Add a new ID for new projects & Style in CSS

export const projectData = [
            {
                // IN PROGRESS --> NEEDS NEW IMAGES ONCE READY
                id: 1,
                title: 'Portfolio',
                miniTitle: '2024',
                subtitle: 'React Three Fiber Application',
                previewImage: '/Images/portfolio-v1.jpg',
                media: [
                    { type: 'image', url: '/Images/portfolio-v1.jpg' },    
                ],
                technologies: ['React', 'ThreeJs', 'JavaScript', 'HTML', 'CSS', 'Blender'],
                description: ['This portfolio was created using React Three Fiber to showcase my game development skills through a unique and interactive design. It features ' +
                    'custom 3D models that represent my work and personal interests in a stylized manner.',
    
                    'My goal was to develop a fully scalable and customizable portfolio that effectively highlights my projects. To achieve this, I utilized HTML, CSS, and ' +
                    'JavaScript with the React library, ensuring a responsive layout that adapts to any device while aligning with the sites theme.',
        
                    'I also prioritized a dynamic user experience, combining interactive 3D elements with intuitive functionality to create an engaging and personalized website.'
                ],
                links: [
                    { label: 'Code Repo', url: 'https://github.com/Jake2508/React-Winter-Portfolio/tree/main/src' },
                ],
            },
            {
                // TODO - UPDATE IMAGES & PROJ SANDBOX
                id: 2,
                title: 'Procedural Islands',
                miniTitle: '2024',
                subtitle: 'Three.js Shader',
                previewImage: '/Images/WebApplications/procedural-promo1.jpg',
                media: [
                    { type: 'image', url: '/Images/WebApplications/procedural-promo1.jpg' },
                    // Add a few more variation images once sandbox is setup
                ],
                technologies: ['Three.js', 'Three bvh', 'GLSL Shaders'],
                description: ['This procedural terrain shader, created with Three.js, generates a realistic, customisable landscapes. ' +
                    'Leveraging custom vertex and fragment shaders, the terrain adapts dynamically with adjustable ' +
                    'settings for position frequency, warp strength, and color gradients.',
    
                    'The goal was to develop a flexible terrain generation system with a GUI for real-time adjustments, allowing for quick, responsive tuning ' + 
                    'of landscape features. Enhanced by an HDR skybox and custom lighting, the environment achieves a high level of realism with accurate ' + 
                    'reflections and shadows.',
        
                    'Key technical elements include high-resolution meshes, shadow-casting lights, and detailed materials for water and wood, creating ' +
                    'a visually immersive landscape ideal for interactive applications.'
                ],
                links: [
                    { label: 'Code Repo', url: 'https://github.com/Jake2508/procedural-terrain-shader/tree/main' },
                    { label: 'Demo', url: 'https://codesandbox.io/p/devbox/github/Jake2508/procedural-terrain-shader' },
                ],
            },
            {
                // COMPLETE
                id: 3,
                title: 'Tankeo Drift',
                miniTitle: '2023-2024',
                subtitle: 'Endless Action Roguelike',
                previewImage: '/Images/Games/Tankeo-Promo2.jpg',
                media: [
                    { type: 'embed', url: 'https://www.youtube.com/embed/MCiUNEL0EaY?si=5YdXJN5stWTy' },
                    { type: 'image', url: '/Images/Games/Tankeo-Promo2.jpg' },
                    { type: 'image', url: '/Images/Games/Tankeo-Promo1.jpg' },
                    { type: 'image', url: '/Images/Games/Tankeo-Promo3.jpg' },
                    { type: 'image', url: '/Images/Games/Tankeo-Promo4.jpg' },
                    { type: 'image', url: '/Images/Games/Tankeo-Promo5.jpg' },
                    { type: 'image', url: '/Images/Games/Tankeo-Promo6.jpg' },
                ],
                technologies: ['Unity', 'C#', 'Blender', 'Photoshop'],
                description: ['Tankeo Drift is an action-packed rogue-like game built in Unity, where you battle endless waves of enemies, gather experience, and upgrade your tank as you progress.',
    
                    'The aim of this project was to develop an endless rogue-like experience, inspired by Vampire Survivor, with a focus on an engaging upgrade system. ' +
                    'Additionally, I wanted to improve my 3D modelling skills.',
        
                    'To achieve this, I implemented a procedurally generated environment. The system uses a 9-tile grid of prefabs that dynamically update based on the ' +
                    'players position, creating the illusion of an infinite level.'
                ],
                links: [
                    { label: 'Code Repo', url: 'https://github.com/Jake2508/Tank/tree/main/Assets/Scripts' },
                    { label: 'Download Game', url: 'https://jake12341234.itch.io/tankeo-drift' },
                ],
            },
            {
                // COMPLETE
                id: 4,
                title: 'Assembly Required',
                miniTitle: '2022',
                subtitle: 'Farming Roguelike Exploration',
                previewImage: '/Images/Games/Assembly-Promo9.jpg', 
                media: [
                    { type: 'embed', url: 'https://www.youtube.com/embed/AQUKyF2cjNM?si=rlF7Eh-CtIbXYHyh' },
                    { type: 'image', url: '/Images/Games/Assembly-Promo1.jpg' },
                    { type: 'image', url: '/Images/Games/Assembly-Promo3.jpg' },
                    { type: 'image', url: '/Images/Games/Assembly-Promo7.jpg' },
                    { type: 'image', url: '/Images/Games/Assembly-Promo8.jpg' },
                    { type: 'image', url: '/Images/Games/Assembly-Promo4.jpg' },
                    { type: 'image', url: '/Images/Games/Assembly-Promo2.jpg' },
                    { type: 'image', url: '/Images/Games/Assembly-Promo5.jpg' },
                ],
                technologies: ['Unreal Engine 4', 'Blueprint', 'Jira'],
                description: ['Assembly Required is a third-person, farming rogue-like sci-fi exploration game developed in Unreal Engine 4. This team project was ' +
                    'completed over a 6-week development period during my time at university.',
    
                    'As a junior tech, I worked in a tech team of three, focusing on gaining hands-on experience while collaborating closely with a cross-discipline team. ',
        
                    'My contributions included developing core features such as the farming tool prototypes, refuel station, melee enemy, acid pools, level transitions, UI ' +
                    'implementation, sound manager, and reviewing level designs. I also assisted with bug fixing across various areas of the game.' 
                ],
                links: [
                    { label: 'Code Repo', url: 'https://github.com/TomWilkinsonGames/RoboFarm' },
                    { label: 'Download Game', url: 'https://tomwilkinson.itch.io/assembly-required' },
                ],
            },
            {
                // COMPLETE
                id: 5,
                title: 'Deliberation',
                miniTitle: '2024',
                subtitle: 'A* Pathfinding Prototype',
                previewImage: '/Images/Games/Deliberation-Promo1.jpg', 
                media: [
    
                    { type: 'embed', url: 'https://www.youtube.com/embed/aU5eYhggCLU?si=ILWADHAL0GvOTq-f' },
                    { type: 'image', url: '/Images/Games/Deliberation-Promo1.jpg' }, 
                    { type: 'image', url: '/Images/Games/Deliberation-PromoT1.jpg' }, 
                    { type: 'image', url: '/Images/Games/Deliberation-PromoT2.jpg' }, 
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
                    { label: 'Code Repo', url: 'https://github.com/Jake2508/Deliberation/tree/main/Assets/Deliberation' },
                ],
            },
            {
                // COMPLETE
                id: 6,
                title: 'AstroHaul',
                miniTitle: '2024',
                subtitle: 'Asteroids Gravity Chaos',
                previewImage: '/Images/Games/Asteroids-Promo1.jpg', 
                media: [
                    { type: 'embed', url: 'https://www.youtube.com/embed/8v2ZYKTqcxE?si=w1D3grpEaoYvvMXJ' },
                    { type: 'image', url: '/Images/Games/Asteroids-Promo1.jpg' },
                    { type: 'image', url: '/Images/Games/Asteroids-Promo2.jpg' },
                    { type: 'image', url: '/Images/Games/Asteroids-Promo3.jpg' },
                ],
                technologies: ['Unity', 'C#', 'Aseprite'],
                description: ['AstroHaul is a 2D retro arcade game created in Unity based on the classic Asteroids game. This project was created as part of the Typical Game Jam (within 3 days).',
    
                'My goal for this project was to create a classic I enjoyed and give it a fresh look. I chose to utilise volatile gravitational fields and collection mechanics.',
    
                'To achieve this, I set out to make a gravitation push/pull effect usable for all objects. The idea was to add uncertainty while maintaining responsive feedback ' +
                'so users could understand these forces. '
                ],
                links: [
                    { label: 'Code Repo', url: 'https://github.com/Jake2508/Asteroids/tree/main/Assets/Asteroids%20Game' },
                    { label: 'Typical Game Jam', url: 'https://itch.io/jam/typical-game-jam' },
                    { label: 'Play on WebGL', url: 'https://jake12341234.itch.io/astrohaul' },
                ],
            },
            // {
            //     // MAYBE RE-ADD
            //     id: 7,
            //     title: 'Ascent',
            //     miniTitle: '2022',
            //     subtitle: 'Race to the end party board game',
            //     previewImage: '/Images/Games/Ascent-Promo1.jpg', 
            //     media: [
            //         { type: 'image', url: '/Images/Games/Ascent-Promo2.jpg' },
            //         { type: 'image', url: '/Images/Games/Ascent-Promo3.jpg' },
            //         { type: 'image', url: '/Images/Games/Ascent-Promo4.jpg' },
            //     ],
            //     technologies: ['Photoshop', 'Google Forms'],
            //     description: ['AstroHaul is a 2D retro arcade game created in Unity based on the classic Asteroids game. This project was created as part of the Typical Game Jam (within 3 days).',
    
            //     'My goal for this project was to create a classic I enjoyed and give it a fresh look. I chose to utilise volatile gravitational fields and collection mechanics.',
    
            //     'To achieve this, I set out to make a gravitation push/pull effect usable for all objects. The idea was to add uncertainty while maintaining responsive feedback ' +
            //     'so users could understand these forces. '
            //     ],
            //     links: [
            //         { label: 'Rulebook', url: '/Images/Games/Ascent - Rulebook.pdf' },
            //         { label: 'Development Blog', url: '/Images/Games/Ascent Development Blog.pdf' },
            //         { label: 'Board Games Maker', url: 'https://www.boardgamesmaker.com/' },
            //     ],
            // },
    ];