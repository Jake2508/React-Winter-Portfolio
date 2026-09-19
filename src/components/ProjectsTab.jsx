import React from 'react';
import SectionLabel from './SectionLabel.jsx';

// Cards per carousel page — the grid is 3-up, so paging moves in threes.
export const CARDS_PER_PAGE = 3;

const ELSEWHERE = [
    { label: 'GitHub', url: 'https://github.com/Jake2508' },
    { label: 'itch.io', url: 'https://jake12341234.itch.io/' },
];


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

        <section>
            <SectionLabel name="EVERYTHING ELSE" />
            <div className="elsewhereGrid">
                {ELSEWHERE.map((item) => (
                    <a
                        key={item.label}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="elsewhereTile"
                    >
                        <span className="elsewhereLabel">{item.label} →</span>
                        <span className="elsewhereUrl">{item.url}</span>
                    </a>
                ))}
            </div>
        </section>
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

    // Short final row shows where the next project in this group will land
    const slots = CARDS_PER_PAGE - visible.length;

    return (
        <section>
            <SectionLabel
                name={group.name.toUpperCase()}
                className="groupHeader"
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
            >
                <span className="groupCount" aria-live="polite">{counter}</span>
            </SectionLabel>

            <div className="projectGrid">
                {visible.map((project) => (
                    <ProjectCard key={project.id} project={project} onSelect={() => onSelect(project)} />
                ))}
                {Array.from({ length: slots }, (_, index) => (
                    <div key={`slot-${index}`} className="projectSlot" aria-hidden="true">+ SLOT</div>
                ))}
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
