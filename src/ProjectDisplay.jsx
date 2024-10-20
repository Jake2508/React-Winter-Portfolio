import React, { useState, useEffect, useRef, useCallback } from 'react';

// Main ProjectDisplay Component
const ProjectDisplay = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('about');
    const [selectedProject, setSelectedProject] = useState(null);
    const [fade, setFade] = useState(true);
    const [scale, setScale] = useState(1);
    const [scrollPosition, setScrollPosition] = useState(0); // State to save scroll position
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // State for carousel

    const containerRef = useRef(null);

    // Project data
    const projectData = [
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
      

    const workData = [
        {
            id: 1,
            title: 'QA Tester',
            company: 'West Pier Studio',
            miniTitle: '2024-Present',
            subtitle: 'Deck, Pergola & Fence Planner',
            media: [
                { type: 'embed', url: 'https://www.youtube.com/embed/XT3VvS794iY?si=QxvNAALcfBs0oGyg' }, 
                { type: 'image', url: '/Images/Work/f1-Promo-4.jpg' },
                { type: 'image', url: '/Images/Work/f1-Promo-8.jpg' }, 
                { type: 'image', url: '/Images/Work/f1-Promo-9.png' },
                { type: 'embed', url: 'https://www.youtube.com/embed/EVf7U4epsxs?si=cM60qEAxqth9kPqj' }, 
                { type: 'image', url: '/Images/Work/f1-Promo-7.png' }, 
                { type: 'image', url: '/Images/Work/f1-Promo-6.jpg' },
                { type: 'image', url: '/Images/Work/f1-Promo-5.jpg' },
                { type: 'embed', url: 'https://www.youtube.com/embed/EVf7U4epsxs?si=cM60qEAxqth9kPqj' }, 
                { type: 'image', url: '/Images/Work/f1-Promo-7.png' }, 
                { type: 'image', url: '/Images/Work/f1-Promo-6.jpg' },
                { type: 'image', url: '/Images/Work/f1-Promo-5.jpg' },
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
                { type: 'embed', url: 'https://www.youtube.com/embed/FPTsK5M6TeQ?si=mb3s8LtVxsc93lvM' },
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
    

    // Define project content display function
    const projectContent = (project) => (
        <div>
            <h2>{project.title}</h2>
    
    {/* Carousel Component */}
    {project.media && project.media.length > 0 && (
        <div className='carouselContainer'>
            <button onClick={() => changeImage(-1)} className='carouselButton'>◀</button>

            {/* Render media depending on whether it's an image or an embedded video */}
            <div className='"carouselMedia"'>
                {project.media[currentImageIndex].type === 'image' ? 
                (
                <img className='carouselImage'
                    src={project.media[currentImageIndex].url}
                    alt={project.title} />
                ) : (
                <iframe
                    className='carouselEmbed'
                    src={project.media[currentImageIndex].url}
                    title="Embedded video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
                )}
        </div>
        <button onClick={() => changeImage(1)} className='carouselButton'>▶</button>
        </div>
        )}

    {/* Button Icons Below Carousel */}
    <div className="mediaButtons">
            {project.media.map((mediaItem, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`mediaButton ${currentImageIndex === index ? 'active' : ''}`}
                >
                    {/* You can replace this with an actual icon or image */}
                    {mediaItem.type === 'image' ? (
                        <img src={mediaItem.url} alt={`Thumbnail ${index}`} className="mediaIcon" /> // Image Icons or specific
                    ) : (
                        <span>🎥</span> // Placeholder for video icons
                    )}
                </button>
            ))}
    </div>

    
            {/* Technologies Used */}
            {project.technologies && project.technologies.length > 0 && (
                <div>
                    <h2>Technologies Used</h2>
                    <p> 
                        {project.technologies.map((tech, index) => (
                        <span key={index}>
                        {tech}
                        {index < project.technologies.length - 1 && '  '} {/* Add space between technologies */}
                        </span>
                        ))}
                    </p>
                </div>
            )}
    
            {/* Description */}
            {project.description && (
            <div>
                <h2>Description</h2>
                {project.description.map((paragraph, index) => (
                <p style={{ textAlign: 'left'}}key={index}>{paragraph}</p>
                ))}
            </div>
            )}
    
            {/* Links */}

            {project.links && project.links.length > 0 && (
            <div>
            <h2>Links</h2>
                <ul className='linksList'>
                {project.links.map((link, index) => (
                    <li key={index}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.label}
                        </a>
                    </li>
                ))}
                </ul>
            </div>
            )}

            
        </div>
    );
    

    // Handle project selection : useCallback functions to avoid creating new functions  on every render
    const handleProjectSelect = useCallback((project) => {
        setFade(false); // Fade-out effect
        setScrollPosition(containerRef.current.scrollTop);
        setTimeout(() => {
            setSelectedProject(project); 
            setFade(true); 

            // Scroll to top when selecting a new project
            if (containerRef.current) 
            {
                containerRef.current.scrollTop = 0; 
            }
        }, 300); // Timing should match the transition
    }, []);

    // Handle returning back to project grid : useCallback functions to avoid creating new functions  on every render
    const handleProjectBack = useCallback(() => {
        setFade(false); 
        setTimeout(() => {
            setSelectedProject(null); // Go back to grid view
            setFade(true); 

            // Restore the scroll position
            if (containerRef.current) 
            {
                containerRef.current.scrollTop = scrollPosition; 
            } 
        }, 300);
    }, [scrollPosition]);

    // Carousel Image Navigation
    const changeImage = (direction) => {
        setCurrentImageIndex((prevIndex) => {
            const totalMedia = selectedProject.media.length;
            const newIndex = (prevIndex + direction + totalMedia) % totalMedia; // Loop the index
            return newIndex;
        });
    };
    
    

    // Tab Main Sections
    const content = {
        about: (
            <div>
                <p>
                    Welcome! I'm Jake, an aspiring games developer currently working as a QA Tester at West Pier Studio. <br /><br />
                    For me, development is an iterative process that thrives on building, refining, and confidently sharing ideas.
                    I'm enthusiastic about my work always aiming to innovate. <br /><br />
                    I enjoy writing clean code, designing feature mechanics and supporting others to achieve the same.
                    Learning from new insights and techniques continues to shape and enhance my approaches. <br /><br />
                    This portfolio reflects my passion for game development, showcasing skills in coding, design, and
                    3D modeling. My primary interests lie in procedural generation, roguelikes, and arcade-style games.
                    <div style={{ height: '10px' }} />
                </p>

                <h2>Education</h2>
                <div className='educationContainer'>
                    <div>
                        <h4>BSc Computer Games Design and Programming</h4>
                        <p><a href="https://www.staffs.ac.uk/course/computer-games-design-programming-bsc" target='_blank'>Staffordshire University</a></p>
                        <p className='subInformation'>Graduation Grade: 80</p>
                    </div>
                    <img src="/Images/staffs-logo.png" alt="Staffordshire University" className='educationImage' />
                </div>

                <h2>Experience</h2>
                <h4>C#</h4>
                <p>Studied 3+ years at University. Professional industry experience at my current role creating Unit Tests and making changes when relevant.</p>
                <h4>Javascript / HTML / CSS</h4>
                <p>Experience from setting up my portfolio which utilises the Three JS & React libraries. Custom HTML and CSS code was added to create the UI elements.</p>
                <h4>C++</h4>
                <p>Surface level knowledge gained at university.</p>

                <h2>Bonuses</h2>
                <ul className='bonusList'>
                    <li>Version Control</li>
                    <li>Agile Background</li>
                    <li>Pull Requests</li>
                    <li>Postman API Testing</li>
                    <li>.NET Automation Experience</li>
                    <li>Bonus Point 6</li>
                </ul>
            </div>
        ),
        projects: (
            <div>
                {!selectedProject && (
                    <>
                        <h2>Key Projects</h2>
                        <ProjectGrid
                            data={projectData}
                            onSelect={handleProjectSelect}
                            selectedProject={selectedProject}
                            projectContent={projectContent}
                            onBack={handleProjectBack}
                        />
                        <h2>Additional Projects</h2>
                        <p>You can find additional projects of mine on my Itch.io page...</p>
                    </>
                )}
                {selectedProject && (
                    <ProjectGrid
                        data={projectData}
                        onSelect={handleProjectSelect}
                        selectedProject={selectedProject}
                        projectContent={projectContent}
                        onBack={handleProjectBack}
                    />
                )}
            </div>
        ),
        
        work: (
            <div>
                {!selectedProject && (
                    <>
                        {/* Group work items by company */}
                        {Array.from(
                            workData.reduce((group, work) => {
                                // Group work items by company
                                if (!group.has(work.company)) group.set(work.company, []);
                                group.get(work.company).push(work);
                                return group;
                            }, new Map())
                        ).map(([company, companyWorkItems]) => (
                            <div key={company}>
                                <h2>{company}</h2>
                                <ProjectGrid
                                    data={companyWorkItems}  // Display work items per company
                                    onSelect={handleProjectSelect}
                                    selectedProject={selectedProject}
                                    projectContent={projectContent}
                                    onBack={handleProjectBack}
                                />
                            </div>
                        ))}
                    </>
                )}
                {selectedProject && (
                    <ProjectGrid
                        data={workData}  // Passing entire work data when a project is selected
                        onSelect={handleProjectSelect}
                        selectedProject={selectedProject}
                        projectContent={projectContent}
                        onBack={handleProjectBack}
                    />
                )}
            </div>
        ),        
        
        contact: (
            <div>
                <p>Hope you're having fun playing around with my website and its interactive features! <br />
                    If you want to contact me, please reach out with any of the below methods: <br />
                </p><br />
                <p>Email me at <a href="mailto:rosejake400@gmail.com">rosejake400@gmail.com</a></p>
                <p>Message me on <a href="#" onClick={(e) => { e.preventDefault(); copyToClipboard('07561042931') }}>07561 042931</a></p>
                <p>Contact me on <a href="https://www.linkedin.com/in/jake-rose123/" target="_blank">LinkedIn</a></p>

                <h2>Resume</h2>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px' }}>
                    <a href="https://www.linkedin.com/in/jake-rose123/" target="_blank">View Online</a>
                    <img src="/Images/pdf-icon.png" alt="PDF Icon" style={{ width: '120px', height: '120px' }} />
                    <a href="https://www.linkedin.com/in/jake-rose123/" target="_blank">Download</a>
                </div>
                {/* Fill Blank Space */}
                <div style={{ height: '20px' }} />
            </div>
        ),
    };

    // Effect to handle click outside : useCallback functions to avoid creating new functions  on every render
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                onClose(); // Call onClose if clicked outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    // Handle tab change with fade-out/fade-in effect : useCallback functions to avoid creating new functions  on every render
    const handleTabChange = useCallback((tab) => {
        setFade(false); // Fade-out effect
        setTimeout(() => {
            setSelectedProject(null); // Reset the selected project
            setActiveTab(tab); // Set new active tab
            setFade(true); // Fade-in effect
        }, 300);
    }, []);

    return (
        <div ref={containerRef} className="container custom-scrollbar">
            <div className="tabs">
                {['about', 'projects', 'work', 'contact'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={`tab ${activeTab === tab ? 'active-tab' : ''}`} // Use dynamic class for active tab
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>
            <div
                className={`content ${fade ? 'fade-in' : 'fade-out'}`} // Dynamically apply fade-in or fade-out class
                style={{ transform: `scale(${scale})` }} // Use dynamic scaling in style attribute
            >
                {content[activeTab]}
            </div>
        </div>
    );
    
}
    

// Reusable ProjectGrid Component : React memo -> lets you skip re-rendering a component when its props are unchanged
const ProjectGrid = React.memo(({ data, onSelect, selectedProject, projectContent, onBack }) => {
    return (
        <div className='projectGrid'>
            {selectedProject ? (
                <div style={{ textAlign: 'center' }}>
                    {projectContent(selectedProject)}
                    <button className='backButton' style={{ marginTop: '18px'}} onClick={onBack}>
                        Back
                    </button>
                </div>
            ) : (
                data.map((project) => (
                    <ProjectCard key={project.id} project={project} onSelect={() => onSelect(project)} />
                ))
            )}
        </div>
    );
});

// ProjectCard Component : React memo -> lets you skip re-rendering a component when its props are unchanged
const ProjectCard = React.memo(({ project, onSelect }) => {
    const firstMedia = project.media[0];
    const mediaPreviewUrl = project.media.find(mediaItem => mediaItem.type === 'image')?.url

    return (
        <div className='projectCard' onClick={onSelect}>
            <div className='projectImage' 
                style={{ backgroundImage: `url(${mediaPreviewUrl})` }}>
            </div>
            <div className='projectCardTextContainer'>
                <h3>{project.title}</h3>
                <p className='subInformation' style={{ margin: '0' }}>{project.miniTitle}</p>
                <p style={{ margin: '0', fontSize: '16px' }}>{project.subtitle}</p>
            </div>
        </div>
    );
});

export default ProjectDisplay;
