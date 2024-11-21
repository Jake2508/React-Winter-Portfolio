// Core Extensions
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import "../styles/Project.css";
import "../styles/List.css";
import "../styles/Tab.css";
import "../styles/Scrollbar.css";
import "../styles/UIContainer.css";

// Page Tab Data 
import { AboutData } from '../data/aboutData.js';
import { projectData } from '../data/projectData.js';
import { workData } from '../data/workData.js';
import { ContactData } from '../data/contactData.js';

// Custom Hooks & Components
import ProjectDetails from '../components/ProjectDetails.js';
import Carousel from '../components/Carousel.js';
import useFadeTransition from '../hooks/useFadeTransition';


// Main ProjectDisplay Component
const ProjectDisplay = ({ onClose, className }) => {
    const [activeTab, setActiveTab] = useState('about');
    const [selectedProject, setSelectedProject] = useState(null);
    
    // Fade transition hook
    const { fade, applyTransition } = useFadeTransition();
    const [scrollPosition, setScrollPosition] = useState(0); 
    const [currentImageIndex, setCurrentImageIndex] = useState(0); 
    const containerRef = useRef(null);
    
    // -- Page Transition Setup -- // 
    // useCallback functions avoid creating new functions on every render
    const handleTabChange = useCallback((tab) => {
        if (tab !== activeTab) {  
            applyTransition(() => {
                setActiveTab(tab);
                setSelectedProject(null);  // Reset project selection
            });
        }
    }, [activeTab, applyTransition]);
    
    const handleProjectSelect = useCallback((project) => {
        setScrollPosition(containerRef.current.scrollTop);
        applyTransition(() => {
            setSelectedProject(project); 
            setCurrentImageIndex(0);  // Reset to the first image
            if (containerRef.current) 
            {
                // Scroll to top when selecting a new project
                containerRef.current.scrollTop = 0; 
            }
        }); 
    }, [applyTransition]);

    const handleProjectBack = useCallback(() => {
        applyTransition(() => {
            setSelectedProject(null); // Go back to grid view
            if (containerRef.current) 
            {
                // Restore the scroll position
                containerRef.current.scrollTop = scrollPosition; 
            } 
        }, 300);
    }, [applyTransition, scrollPosition]);

    
    // Close UI Panel 
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

    // Carousel Image Navigation
    const changeImage = (direction) => {
        setCurrentImageIndex((prevIndex) => {
            const totalMedia = selectedProject.media.length;
            const newIndex = (prevIndex + direction + totalMedia) % totalMedia; // Loop the index
            return newIndex;
        });
    };

    // Tab Main Sections
    const memoizedContent = useMemo(() => {
        const content = {
            about: <AboutData />,
            projects: (
                <div>
                    {!selectedProject && (
                        <>
                            <h2>Key Projects</h2>
                            <ProjectGrid
                                data={projectData}
                                onSelect={handleProjectSelect}
                                selectedProject={selectedProject}
                                onBack={handleProjectBack}
                            />
                            <h2>Bonus Projects</h2>
                            <p className='centerElements'>
                                Explore side projects & prototypes on my &nbsp;
                                <a href="https://jake12341234.itch.io/" target="_blank" rel="noopener noreferrer">
                                    itch.io page
                                </a>
                            </p>
                        </>
                    )}
                    {selectedProject && (
                        <ProjectGrid
                            data={projectData}
                            onSelect={handleProjectSelect}
                            selectedProject={selectedProject}
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
                                    if (!group.has(work.company)) group.set(work.company, []);
                                    group.get(work.company).push(work);
                                    return group;
                                }, new Map())
                            ).map(([company, companyWorkItems]) => (
                                <div key={company}>
                                    <h2>{company}</h2>
                                    <ProjectGrid
                                        data={companyWorkItems} // Display work items per company
                                        onSelect={handleProjectSelect}
                                        selectedProject={selectedProject}
                                        onBack={handleProjectBack}
                                    />
                                </div>
                            ))}
                        </>
                    )}
                    {selectedProject && (
                        <ProjectGrid
                            data={workData} // Passing entire work data when a project is selected
                            onSelect={handleProjectSelect}
                            selectedProject={selectedProject}
                            onBack={handleProjectBack}
                        />
                    )}
                </div>
            ),
            contact: <ContactData />,
        };

        return content[activeTab];
    }, [activeTab, selectedProject, projectData, workData]);

    return (
        <div ref={containerRef} className={`container custom-scrollbar ${className || ''}`}>
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
            >
                {memoizedContent}
            </div>
        </div>
    );
};

    
// Reusable ProjectGrid Component : React memo -> lets you skip re-rendering a component when its props are unchanged
const ProjectGrid = React.memo(({ data, onSelect, selectedProject, onBack }) => {
    return (
        <div className='projectGrid'>
            {selectedProject ? (
                <div style={{ textAlign: 'center' }}>
                    <ProjectDetails project={selectedProject} />
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