import React from 'react';
import Carousel from '../components/Carousel';


const ProjectDetails = ({ project, onBack }) => {
    if (!project) return null;

    return (
        <div className="detailsContainer">

            <button type="button" className="backNav" onClick={onBack}>
                <svg width="6" height="9" viewBox="0 0 6 9" fill="none" aria-hidden="true">
                    <path d="M5 1L1 4.5L5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to projects
            </button>

            {/* Title row — year, filling rule, then the single gold call to action */}
            <div className="detailsHeader">
                <h2 className="detailsTitle">{project.title}</h2>
                <span className="detailsYear">{project.miniTitle}</span>
                <span className="detailsHeaderRule" aria-hidden="true" />
                {project.primary && (
                    <a
                        href={project.primary.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="detailsPrimary"
                    >
                        {project.primary.label} →
                    </a>
                )}
            </div>

            {project.technologies?.length > 0 && (
                <div className="detailsTags">
                    {project.technologies.map((tech) => (
                        <span key={tech} className="detailsTag">{tech}</span>
                    ))}
                </div>
            )}

            {project.description?.length > 0 && (
                <div className="detailsDescription">
                    {project.description.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
            )}

            {project.links?.length > 0 && (
                <div className="detailsLinks">
                    {project.links.map((link) => (
                        <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="detailsLinkBtn"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            )}

            {project.media?.length > 0 && (
                <Carousel media={project.media} title={project.title} />
            )}

        </div>
    );
};


export default ProjectDetails;
