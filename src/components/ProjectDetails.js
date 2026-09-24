import React from 'react';
import Carousel from '../components/Carousel';


const ProjectDetails = ({ project, onBack }) => {
    if (!project) return null;

    return (
        <div className="detailsContainer">

            <button type="button" className="backNav" onClick={onBack}>
                <span aria-hidden="true">‹</span> Back to projects
            </button>

            {/* Title stands alone; year sits beside it */}
            <div className="detailsTitleRow">
                <h2 className="detailsTitle">{project.title}</h2>
                <span className="detailsYear">{project.miniTitle}</span>
            </div>

            {/* Tags on the left, links and the primary CTA on the right */}
            {(project.technologies?.length > 0 || project.links?.length > 0 || project.primary) && (
                <div className="detailsMetaRow">
                    {project.technologies?.length > 0 && (
                        <div className="detailsTags">
                            {project.technologies.map((tech) => (
                                <span key={tech} className="detailsTag">{tech}</span>
                            ))}
                        </div>
                    )}

                    {(project.links?.length > 0 || project.primary) && (
                        <div className="detailsActions">
                            {project.links?.map((link) => (
                                <a
                                    key={link.url}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btnSecondary btnCompact"
                                >
                                    {link.label}<span aria-hidden="true"> ↗</span>
                                    <span className="visuallyHidden"> (opens in new tab)</span>
                                </a>
                            ))}
                            {project.primary && (
                                <a
                                    href={project.primary.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btnPrimary btnCompact"
                                >
                                    {project.primary.label}
                                    <span className="visuallyHidden"> (opens in new tab)</span>
                                </a>
                            )}
                        </div>
                    )}
                </div>
            )}

            {project.description?.length > 0 && (
                <div className="detailsDescription">
                    {project.description.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
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
