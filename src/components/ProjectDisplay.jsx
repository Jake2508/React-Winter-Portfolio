// Core Extensions
import React, { useState, useEffect, useRef, useCallback } from 'react';

// Custom Hooks & Components
import { projectData } from '../data/projectData.js';
import { workData } from '../data/workData.js';
import Carousel from '../components/Carousel.js';


// Main ProjectDisplay Component
const ProjectDisplay = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('about');
    const [selectedProject, setSelectedProject] = useState(null);
    const [fade, setFade] = useState(true);
    const [scale, setScale] = useState(1);
    const [scrollPosition, setScrollPosition] = useState(0); // State to save scroll position
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // State for carousel
    const containerRef = useRef(null);
    

    // Define project content display function
    const projectContent = (project) => (
        <div>
            <h2>{project.title}</h2>
            
            {/* Use the Carousel Component */}
            {project.media && project.media.length > 0 && (
                <Carousel media={project.media} />
            )}
    
            {/* Technologies Used */}
            {project.technologies && project.technologies.length > 0 && (
                <div>
                    <h2>Technologies Used</h2>
                    <p className='tagList'>
                        {project.technologies.map((tech, index) => (
                            <span key={index}>
                                {tech}
                                {index < project.technologies.length - 1 && ' '}
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
                        <p style={{ textAlign: 'left' }} key={index}>{paragraph}</p>
                    ))}
                </div>
            )}
    
            {/* Links */}
            {project.links && project.links.length > 0 && (
                <div>
                    <h2>Links</h2>
                    <ul className='tagList'>
                        {project.links.map((link, index) => (
                            <span key={index}>
                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                    {link.label}
                                </a>
                            </span>
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
            setCurrentImageIndex(0);  // Reset to the first image

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
                </p>

                <h2>Education</h2>
                <div className='educationContainer'>
                    <div>
                        <h4>BSc Computer Games Design and Programming</h4>
                        <p><a href="https://www.staffs.ac.uk/course/computer-games-design-programming-bsc" target='_blank'>Staffordshire University</a></p>
                        <p className='subInformation'>Graduation Grade: 82</p>
                    </div>
                    <a href="https://www.staffs.ac.uk/" target='_blank' rel='noopener noreferrer'>
                        <img src="/Images/staffs-logo.jpg" alt="Staffordshire University" className='educationImage' /> 
                    </a>
                </div>

                <h2>Experience</h2>
                <h4>C#</h4>
                <p>Studied 3+ years at University. Professional industry experience at my current role creating Unit & Automation tests and making changes when relevant.</p>
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
                    <li>NUnit</li>
                    <li>Selenium Web Driver</li>
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
                        <h2>Bonus Projects</h2>
                        <p className='centerElements'>
                        Explore side projects & prototypes on my &nbsp;   
                            <a href="https://jake12341234.itch.io/" target="_blank" rel="noopener noreferrer">
                            itch.io Page
                            </a>
                        </p>
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
                    If you'd like to reach out, please feel free to contact me on any of the below methods: <br />
                </p>
                <p>Email me at <a href="mailto:rosejake400@gmail.com">rosejake400@gmail.com</a></p>
                <p>Message me on <a href="#" onClick={(e) => { e.preventDefault(); copyToClipboard('07561042931') }}>07561 042931</a></p>
                <p>Contact me on <a href="https://www.linkedin.com/in/jake-rose123/" target="_blank">LinkedIn</a></p>
                <p>View my code on <a href="https://github.com/Jake2508?tab=repositories" target="_blank">GitHub</a></p>

                <h2>Resume</h2>
                <div className='centerElements'>
                    <p><a href="https://www.linkedin.com/in/jake-rose123/" target="_blank">View Online</a></p>
                    <img src="/Images/pdf-icon2.jpg" alt="PDF Icon" className='educationImage' />
                    <p><a href="https://www.linkedin.com/in/jake-rose123/" target="_blank">Download</a></p>
                </div>
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

    // Function to handle fade transition
    const handleFadeTransition = (callback) => {
        setFade(false); // Start fade-out effect
        setTimeout(() => {
            callback(); 
            setFade(true); // Start fade-in effect -does not work 
        }, 300); // Timing should match your CSS transition
    };

    // Handle tab change
    const handleTabChange = useCallback((tab) => {
        if (tab !== activeTab) {  // Only reset if selecting a new tab
            handleFadeTransition(() => {
                setActiveTab(tab);
                setSelectedProject(null);  // Reset project selection on tab change
            });
        }
    }, [activeTab]);

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
    return (
        <div className='projectCard' onClick={onSelect}>
            <div className='projectImage' 
                style={{ backgroundImage: `url(${project.previewImage})` }}> {/* Display previewImage */}
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