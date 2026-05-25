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
import useFadeTransition from '../hooks/useFadeTransition';


// Main ProjectDisplay Component
const ProjectDisplay = ({ onClose, className }) => {
    const [activeTab, setActiveTab] = useState('about');
    const [selectedProject, setSelectedProject] = useState(null);
    
    // Fade transition hook
    const { fade, applyTransition } = useFadeTransition();
    const [scrollPosition, setScrollPosition] = useState(0);
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

    // Tab Main Sections
    const memoizedContent = useMemo(() => {
        const content = {
            about: <AboutData />,
            projects: (
                <div>
                    {!selectedProject && (
                        <>
                            <h2 className='sectionHeading'>Key Projects</h2>
                            <ProjectGrid
                                data={projectData}
                                onSelect={handleProjectSelect}
                                selectedProject={selectedProject}
                                onBack={handleProjectBack}
                            />
                            <h2 className='sectionHeading'>Bonus Projects</h2>
                            <p>
                                Explore side projects &amp; prototypes on my <a href="https://jake12341234.itch.io/" target="_blank" rel="noopener noreferrer">itch.io page</a>.
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
                                    <h2 className='sectionHeading'>{company}</h2>
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
    }, [activeTab, selectedProject, handleProjectSelect, handleProjectBack]);

    const tabs = ['about', 'projects', 'work', 'contact'];
    const activeIndex = tabs.indexOf(activeTab);

    return (
        <div ref={containerRef} className={`container custom-scrollbar ${className || ''}`}>
            <div className="tabs">
                <div
                    className="tabIndicator"
                    style={{ transform: `translateX(calc(${activeIndex} * (100% + 4px)))` }}
                />
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => handleTabChange(tab)}
                        className={`tab ${activeTab === tab ? 'active-tab' : ''}`}
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
                <div>
                    <button className='backNav' onClick={onBack}>← Back</button>
                    <ProjectDetails project={selectedProject} />
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
            <div className='projectImage' style={{ backgroundImage: `url(${project.previewImage})` }} />
            <div className='projectCardOverlay'>
                <p className='projectMiniTitle subInformation'>{project.miniTitle}</p>
                <h3 className='projectCardTitle'>{project.title}</h3>
                <p className='projectCardSubtitle'>{project.subtitle}</p>
            </div>
        </div>
    );
});


export default ProjectDisplay;