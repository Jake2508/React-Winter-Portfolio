import React from 'react';
import Carousel from '../components/Carousel';


const ProjectDetails = ({ project }) => {
    if (!project) return null;

    return (
        <div className="detailsContainer">

            {/* Info card — full width */}
            <div className="bentoCard detailsInfoPanel">

                <div className="detailsHeader">
                    <div>
                        <h3 className="detailsTitle">{project.title}</h3>
                        {project.subtitle && (
                            <p className="subInformation detailsMeta">
                                {project.miniTitle} · {project.subtitle}
                            </p>
                        )}
                    </div>

                    {project.technologies?.length > 0 && (
                        <div className="detailsTags">
                            {project.technologies.map((tech, index) => (
                                <span key={index} className="detailsTag">{tech}</span>
                            ))}
                        </div>
                    )}
                </div>

                {project.description?.length > 0 && (
                    <div className="detailsDescription">
                        {project.description.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                )}

                {project.links?.length > 0 && (
                    <div className="detailsLinks">
                        {project.links.map((link, index) => (
                            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="detailsLinkBtn">
                                {link.label}
                            </a>
                        ))}
                    </div>
                )}

            </div>

            {/* Carousel — full width below */}
            {project.media?.length > 0 && (
                <div className="bentoCard detailsCarouselPanel">
                    <Carousel media={project.media} />
                </div>
            )}

        </div>
    );
};


export default ProjectDetails;
