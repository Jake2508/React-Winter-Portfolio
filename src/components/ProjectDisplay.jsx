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
import { assertUniqueSlugs, findBySlug, hashFor, parseHash, slugify, titleFor } from '../utils/routes.js';

assertUniqueSlugs(projectData);


const TABS = ['about', 'projects', 'contact'];

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';


// Main ProjectDisplay Component
const ProjectDisplay = ({ onClose, onRequestOpen, isVisible, requestedTab }) => {
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

    /*
      -- URL ----------------------------------------------------------------
      The hash mirrors whichever view is showing. Handlers write it, popstate
      reads it back, and nothing writes while handling a popstate, so the two
      never chase each other.

      pushDepth counts the entries this session added, so the close button can
      unwind them in one step and leave the user where they were before the
      panel opened rather than stranding them mid-stack.
    */
    const pushDepthRef = useRef(0);
    const projectPushedRef = useRef(false);

    const writeRoute = useCallback((route, { replace }) => {
        const url = hashFor(route) || `${window.location.pathname}${window.location.search}`;

        if (replace) {
            window.history.replaceState(null, '', url);
        } else {
            window.history.pushState(null, '', url);
            pushDepthRef.current += 1;
        }

        document.title = titleFor(route, projectData);
    }, []);

    // Land on the tab the scene HUD asked for, without the fade — the panel is
    // opening at the same moment, so a transition would be invisible anyway.
    // A slug comes from the URL and picks the sub-page straight away.
    useEffect(() => {
        if (!requestedTab) return;
        pendingTabRef.current = requestedTab.tab;
        setActiveTab(requestedTab.tab);
        setSelectedProject(requestedTab.slug
            ? findBySlug(projectData, requestedTab.slug)
            : null);

        // Opened by a click, so this view is new to the history. Opened from
        // the URL, the entry is already there and pushing would double it.
        if (!requestedTab.fromHistory) {
            writeRoute({ tab: requestedTab.tab, slug: requestedTab.slug }, { replace: false });
            projectPushedRef.current = Boolean(requestedTab.slug);
        }
    }, [requestedTab, writeRoute]);

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
        // Replaced, not pushed: Back should leave the panel, not walk back
        // through every tab the visitor happened to look at.
        writeRoute({ tab, slug: null }, { replace: true });
        projectPushedRef.current = false;

        applyTransition(() => {
            setActiveTab(tab);
            setSelectedProject(null);  // Reset project selection
        });
    }, [applyTransition, writeRoute]);

    const handleProjectSelect = useCallback((project) => {
        setScrollPosition(contentRef.current.scrollTop);
        writeRoute({ tab: 'projects', slug: slugify(project.title) }, { replace: false });
        projectPushedRef.current = true;

        applyTransition(() => {
            setSelectedProject(project);
            if (contentRef.current)
            {
                // Scroll to top when selecting a new project
                contentRef.current.scrollTop = 0;
            }
        });
    }, [applyTransition, writeRoute]);

    /*
      The next project in the same group, wrapping at the end — same order the
      grid lays them out in. Null for a single-project group, where the link
      would only point back at the page you are on.
    */
    const nextProject = useMemo(() => {
        if (!selectedProject) return null;
        const group = groups.find((entry) => entry.name === selectedProject.group);
        if (!group || group.projects.length < 2) return null;

        const index = group.projects.findIndex((entry) => entry.id === selectedProject.id);
        if (index === -1) return null;
        return group.projects[(index + 1) % group.projects.length];
    }, [groups, selectedProject]);

    // Moving between sub-pages leaves `scrollPosition` alone: it holds where the
    // grid was, and Back still has to land there however many projects you step
    // through first.
    const showProject = useCallback((project) => {
        applyTransition(() => {
            setSelectedProject(project);
            if (contentRef.current) contentRef.current.scrollTop = 0;
        });
    }, [applyTransition]);

    const handleNextProject = useCallback((project) => {
        // Replaced, so Back still lands on the grid however many projects you
        // step through rather than retracing each one.
        writeRoute({ tab: 'projects', slug: slugify(project.title) }, { replace: true });
        showProject(project);
    }, [showProject, writeRoute]);

    // Shared by the Back button and by popstate; the latter must not write the
    // URL again, which is what `fromHistory` suppresses.
    const showProjectGrid = useCallback(() => {
        applyTransition(() => {
            setSelectedProject(null); // Go back to grid view
            if (contentRef.current)
            {
                // Restore the scroll position
                contentRef.current.scrollTop = scrollPosition;
            }
        }, 300);
    }, [applyTransition, scrollPosition]);

    /*
      Back mirrors however the sub-page was reached. Opened from the grid, it
      steps the history entry off so the browser's own Back agrees with the
      button; arrived at by URL, there is nothing to step off, so the entry is
      replaced instead.
    */
    const handleProjectBack = useCallback(() => {
        if (projectPushedRef.current) {
            projectPushedRef.current = false;
            window.history.back();   // popstate calls showProjectGrid
            return;
        }

        writeRoute({ tab: 'projects', slug: null }, { replace: true });
        showProjectGrid();
    }, [showProjectGrid, writeRoute]);

    /*
      Closing unwinds every entry this session pushed in one step, so the
      visitor lands where they were before the panel opened rather than part
      way up the stack. Arrived by URL with nothing pushed, the hash is simply
      dropped instead.
    */
    const handleClose = useCallback(() => {
        const depth = pushDepthRef.current;
        pushDepthRef.current = 0;
        projectPushedRef.current = false;

        if (depth > 0) {
            window.history.go(-depth);  // popstate does the closing
            return;
        }

        writeRoute(null, { replace: true });
        onClose();
    }, [onClose, writeRoute]);

    /*
      The browser's own Back is the one thing that moves the panel without a
      handler above running, so this is where the URL drives the state rather
      than following it. Nothing here writes to history.
    */
    useEffect(() => {
        const handlePopState = () => {
            const route = parseHash(window.location.hash, projectData);
            document.title = titleFor(route, projectData);
            pushDepthRef.current = Math.max(0, pushDepthRef.current - 1);

            if (!route) {
                pushDepthRef.current = 0;
                projectPushedRef.current = false;
                onClose();
                return;
            }

            const target = route.slug ? findBySlug(projectData, route.slug) : null;
            projectPushedRef.current = false;

            // Closed, so the whole view has to be built from the URL
            if (!isVisible) {
                onRequestOpen(route.tab, route.slug);
                return;
            }

            if (route.tab !== pendingTabRef.current) {
                pendingTabRef.current = route.tab;
                applyTransition(() => {
                    setActiveTab(route.tab);
                    setSelectedProject(target);
                });
                return;
            }

            // Same tab, so only the sub-page can have changed
            if (target) showProject(target);
            else showProjectGrid();
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [isVisible, onClose, onRequestOpen, applyTransition, showProject, showProjectGrid]);


    // Close UI Panel
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                handleClose(); // Call handleClose if clicked outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClose]);

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
                handleClose();
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
    }, [isVisible, handleClose, handleTabChange]);

    // Tab Main Sections
    const memoizedContent = useMemo(() => {
        const content = {
            about: <AboutData />,
            projects: selectedProject
                ? (
                    <ProjectDetails
                        project={selectedProject}
                        onBack={handleProjectBack}
                        next={nextProject}
                        onSelectNext={handleNextProject}
                    />
                )
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
    }, [activeTab, selectedProject, handleProjectSelect, handleProjectBack, handleNextProject,
        nextProject, groups, groupPages, pageGroup]);

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
                        onClick={handleClose}
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
