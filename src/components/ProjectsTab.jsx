import React from 'react';
import SectionLabel from './SectionLabel.jsx';
import { GitHubIcon, ItchIoIcon } from './ContactIcons.jsx';
import { socials } from '../data/panelData.js';

// Cards per carousel page — the grid is 3-up, so paging moves in threes.
export const CARDS_PER_PAGE = 3;

const GITHUB = socials.find((social) => social.label === 'GitHub');
const ITCH = socials.find((social) => social.label === 'itch.io');


/*
  Projects tab — one carousel per group. Nothing is ever hidden behind a
  collapse: every group shows its arrow pair, disabled when it fits on a page.
*/
const ProjectsTab = ({ groups, pages, onPage, onSelect }) => (
    <div className="projectsTab">
        {groups.map((group) => (
            <ProjectGroup
                key={group.name}
                group={group}
                page={pages[group.name] ?? 0}
                onPage={onPage}
                onSelect={onSelect}
            />
        ))}

        <p className="projectsMore">
            More on{' '}
            <a href={GITHUB.url} target="_blank" rel="noopener noreferrer" className="projectsMoreLink">
                <span className="projectsMoreIcon projectsMoreIconGithub"><GitHubIcon /></span>
                GitHub<span aria-hidden="true"> ↗</span>
                <span className="visuallyHidden"> (opens in new tab)</span>
            </a>
            {' '}and{' '}
            <a href={ITCH.url} target="_blank" rel="noopener noreferrer" className="projectsMoreLink">
                <span className="projectsMoreIcon projectsMoreIconItch"><ItchIoIcon /></span>
                itch.io<span aria-hidden="true"> ↗</span>
                <span className="visuallyHidden"> (opens in new tab)</span>
            </a>
        </p>
    </div>
);


const ProjectGroup = ({ group, page, onPage, onSelect }) => {
    const total = group.projects.length;
    const pageCount = Math.max(1, Math.ceil(total / CARDS_PER_PAGE));
    const safePage = Math.min(page, pageCount - 1);
    const start = safePage * CARDS_PER_PAGE;
    const visible = group.projects.slice(start, start + CARDS_PER_PAGE);

    // "1–3 of 4" while paging, "2 projects" when the whole group fits
    const counter = pageCount > 1
        ? `${start + 1}–${start + visible.length} of ${total}`
        : `${total} project${total === 1 ? '' : 's'}`;

    // One array per page; a short last page just renders fewer cards
    const pageList = Array.from({ length: pageCount }, (_, index) =>
        group.projects.slice(index * CARDS_PER_PAGE, (index + 1) * CARDS_PER_PAGE));

    return (
        <section className="projectGroup panelSection">
            <SectionLabel
                name={group.name}
                count={counter}
                trailing={(
                    <div className="groupArrows">
                        <button
                            type="button"
                            className="groupArrow"
                            onClick={() => onPage(group.name, -1)}
                            disabled={safePage === 0}
                            aria-label={`Previous ${group.name} projects`}
                        >
                            <svg width="6" height="9" viewBox="0 0 6 9" fill="none" aria-hidden="true">
                                <path d="M5 1L1 4.5L5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="groupArrow"
                            onClick={() => onPage(group.name, 1)}
                            disabled={safePage >= pageCount - 1}
                            aria-label={`Next ${group.name} projects`}
                        >
                            <svg width="6" height="9" viewBox="0 0 6 9" fill="none" aria-hidden="true">
                                <path d="M1 1L5 4.5L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                )}
            />

            {/*
              Every page is rendered and the track slides, so cards sweep across
              rather than swapping in place. Off-screen pages are inert so they
              stay out of the tab order.
            */}
            <div className="projectTrackViewport">
                <div
                    className="projectTrack"
                    style={{ transform: `translateX(calc(${-safePage} * (100% + var(--page-gap))))` }}
                >
                    {pageList.map((page, pageIndex) => (
                        <div
                            className="projectGrid"
                            key={pageIndex}
                            aria-hidden={pageIndex !== safePage}
                            inert={pageIndex !== safePage ? '' : undefined}
                        >
                            {page.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onSelect={() => onSelect(project)}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


// React memo -> lets you skip re-rendering a component when its props are unchanged
const ProjectCard = React.memo(({ project, onSelect }) => (
    <button type="button" className="projectCard" onClick={onSelect}>
        <span
            className="projectImage"
            style={{ backgroundImage: `url(${project.previewImage})` }}
            aria-hidden="true"
        />
        <span className="projectCardBody">
            <span className="projectCardTitle">{project.title}</span>
            <span className="projectCardMeta">{project.miniTitle} · {project.subtitle}</span>
        </span>
    </button>
));


export default ProjectsTab;
