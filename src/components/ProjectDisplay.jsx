// Core Extensions
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import "../styles/Project.css";
import "../styles/About.css";
import "../styles/Contact.css";
import "../styles/Tab.css";
import "../styles/Scrollbar.css";
import "../styles/UIContainer.css";

// Page Tab Data
import { AboutData } from '../data/aboutData.js';
import { projectData, projectGroups } from '../data/projectData.js';
import { ContactData } from '../data/contactData.js';
import { AVAILABILITY, availability, profile } from '../data/panelData.js';

// Custom Hooks & Components
import ProjectDetails from '../components/ProjectDetails.js';
import ProjectsTab, { CARDS_PER_PAGE } from '../components/ProjectsTab.jsx';
import useFadeTransition from '../hooks/useFadeTransition';


const TABS = ['about', 'projects', 'contact'];

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';


// Main ProjectDisplay Component
const ProjectDisplay = ({ onClose, isVisible, requestedTab }) => {
    const [activeTab, setActiveTab] = useState('about');
    const [selectedProject, setSelectedProject] = useState(null);

    // Fade transition hook
    const { fade, applyTransition } = useFadeTransition();
    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const returnFocusRef = useRef(null);

    // Tab changes fade out before they commit, so activeTab lags by the
    // transition. Arrow presses step from this instead, otherwise two quick
    // presses both read the same stale tab and the second one is swallowed.
    const pendingTabRef = useRef('about');

    // Projects are grouped into carousels, one page of cards at a time.
    const groups = useMemo(() => projectGroups
        .map(({ name }) => ({
            name,
            projects: projectData.filter((project) => project.group === name),
        }))
        .filter((group) => group.projects.length > 0), []);

    const [groupPages, setGroupPages] = useState({});

    // Driven by each group's own arrow buttons only — the arrow keys belong to
    // tab navigation, so they never reach the carousels.
    const pageGroup = useCallback((name, direction) => {
        const group = groups.find((entry) => entry.name === name);
        if (!group) return;

        const lastPage = Math.ceil(group.projects.length / CARDS_PER_PAGE) - 1;
        setGroupPages((previous) => {
            const current = previous[name] ?? 0;
            const next = Math.min(Math.max(current + direction, 0), lastPage);
            return next === current ? previous : { ...previous, [name]: next };
        });
    }, [groups]);

    // Land on the tab the scene HUD asked for, without the fade — the panel is
    // opening at the same moment, so a transition would be invisible anyway.
    useEffect(() => {
        if (!requestedTab) return;
        pendingTabRef.current = requestedTab.tab;
        setActiveTab(requestedTab.tab);
        setSelectedProject(null);
    }, [requestedTab]);

    // Set initial collapsed state on mount
    useEffect(() => {
        if (containerRef.current) {
            gsap.set(containerRef.current, { scaleY: 0.015, opacity: 0, pointerEvents: 'none' });
        }
    }, []);

    // CRT expand/collapse animation
    useEffect(() => {
        if (!containerRef.current) return;
        gsap.killTweensOf(containerRef.current);
        if (isVisible) {
            gsap.to(containerRef.current, {
                scaleY: 1, opacity: 1, pointerEvents: 'auto',
                duration: 0.45, ease: 'back.out(1.2)',
            });
        } else {
            gsap.to(containerRef.current, {
                scaleY: 0.015, opacity: 0, pointerEvents: 'none',
                duration: 0.45, ease: 'power2.out',
            });
        }
    }, [isVisible]);

    // -- Page Transition Setup -- //
    // useCallback functions avoid creating new functions on every render
    const handleTabChange = useCallback((tab) => {
        if (tab === pendingTabRef.current) return;

        pendingTabRef.current = tab;
        applyTransition(() => {
            setActiveTab(tab);
            setSelectedProject(null);  // Reset project selection
        });
    }, [applyTransition]);

    const handleProjectSelect = useCallback((project) => {
        setScrollPosition(contentRef.current.scrollTop);
        applyTransition(() => {
            setSelectedProject(project);
            if (contentRef.current)
            {
                // Scroll to top when selecting a new project
                contentRef.current.scrollTop = 0;
            }
        });
    }, [applyTransition]);

    const handleProjectBack = useCallback(() => {
        applyTransition(() => {
            setSelectedProject(null); // Go back to grid view
            if (contentRef.current)
            {
                // Restore the scroll position
                contentRef.current.scrollTop = scrollPosition;
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

    /*
      Keep the closed panel out of the tab order. It stays mounted at
      scaleY 0.015 / opacity 0, so without this it is invisible but still
      reachable by keyboard.
    */
    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;

        if (isVisible) {
            node.removeAttribute('inert');
            node.removeAttribute('aria-hidden');
        } else {
            node.setAttribute('inert', '');
            node.setAttribute('aria-hidden', 'true');
        }
    }, [isVisible]);

    // Move focus into the panel on open, and hand it back to the arcade on close.
    // The content region takes it rather than the close button, so opening by
    // mouse does not paint a focus ring around the X.
    useEffect(() => {
        if (isVisible) {
            returnFocusRef.current = document.activeElement;
            contentRef.current?.focus();
            return;
        }

        const previous = returnFocusRef.current;
        returnFocusRef.current = null;
        if (!previous) return;

        if (previous.isConnected && previous !== document.body) {
            previous.focus();
            return;
        }

        // The trigger is a 3D object, so the canvas is the nearest real target.
        const canvas = document.querySelector('canvas');
        if (canvas) {
            canvas.tabIndex = -1;
            canvas.focus();
        }
    }, [isVisible]);

    /*
      Keyboard contract: Esc closes, arrows step through the tabs, and Tab is
      trapped inside the panel while it is open. Not labelled on screen —
      the close button's title is the only visible hint now the footer is gone.
    */
    useEffect(() => {
        if (!isVisible) return undefined;

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
                return;
            }

            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                // Always handled, so the keys never fall through to the
                // browser and start scrolling or extending a text selection.
                event.preventDefault();

                const direction = event.key === 'ArrowRight' ? 1 : -1;
                const from = TABS.indexOf(pendingTabRef.current);
                const next = TABS[(from + direction + TABS.length) % TABS.length];

                /*
                  Park focus back on the panel before switching. A tab button
                  that was clicked earlier still holds focus, and the first key
                  press makes the browser paint its focus ring — which then sits
                  on the old tab while a different one goes active.
                */
                contentRef.current?.focus();
                handleTabChange(next);
                return;
            }

            if (event.key === 'Tab') {
                const node = containerRef.current;
                if (!node) return;

                const focusables = Array.from(node.querySelectorAll(FOCUSABLE))
                    .filter((element) => element.offsetParent !== null && element.tabIndex >= 0);
                if (focusables.length === 0) return;

                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                const active = document.activeElement;

                if (event.shiftKey && (active === first || !node.contains(active))) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && active === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isVisible, onClose, handleTabChange]);

    // Tab Main Sections
    const memoizedContent = useMemo(() => {
        const content = {
            about: <AboutData />,
            projects: selectedProject
                ? <ProjectDetails project={selectedProject} onBack={handleProjectBack} />
                : (
                    <ProjectsTab
                        groups={groups}
                        pages={groupPages}
                        onPage={pageGroup}
                        onSelect={handleProjectSelect}
                    />
                ),
            contact: <ContactData />,
        };

        return content[activeTab];
    }, [activeTab, selectedProject, handleProjectSelect, handleProjectBack, groups, groupPages, pageGroup]);

    const status = AVAILABILITY[availability];

    return (
        <div className="panelAnchor">
            <div
                ref={containerRef}
                className="container"
                role="dialog"
                aria-modal="true"
                aria-label={`${profile.name} — portfolio`}
            >
                <div className="panelScanlines" aria-hidden="true" />
                <div className="panelVignette" aria-hidden="true" />
                <div className="panelSweep" aria-hidden="true" />

                {/* Header */}
                <header className="panelHeader">
                    <h1 className="panelName">{profile.name}</h1>
                    <span className="panelHeaderDivider" aria-hidden="true" />
                    <p className="panelRoles">{profile.roles}</p>
                    <button
                        type="button"
                        className="panelClose"
                        onClick={onClose}
                        title="Close portfolio (Esc)"
                        aria-label="Close portfolio"
                    >
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
                            <path d="M1 1L8 8M8 1L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </button>
                </header>

                {/* Tabs + availability */}
                <div className="panelTabBar">
                    <div className="tabs" role="tablist" aria-label="Portfolio sections">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                id={`tab-${tab}`}
                                type="button"
                                role="tab"
                                aria-selected={activeTab === tab}
                                aria-controls="panel-content"
                                onClick={() => handleTabChange(tab)}
                                className={`tab ${activeTab === tab ? 'active-tab' : ''}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="tabStatus">
                        {status && (
                            <span className="tabAvailability">
                                <span className="tabAvailabilityDot" style={{ background: status.colour }} aria-hidden="true" />
                                <span className="tabAvailabilityLabel" style={{ color: status.colour }}>
                                    {status.label}
                                </span>
                            </span>
                        )}
                        {status && <span className="tabStatusDivider" aria-hidden="true" />}
                        <span className="tabLocation">{profile.location}</span>
                    </div>
                </div>

                {/* Page content */}
                <div
                    ref={contentRef}
                    id="panel-content"
                    role="tabpanel"
                    aria-labelledby={`tab-${activeTab}`}
                    tabIndex={-1}
                    className={`content custom-scrollbar ${fade ? 'fade-in' : 'fade-out'}`}
                >
                    {memoizedContent}
                </div>
            </div>
        </div>
    );
};


export default ProjectDisplay;
