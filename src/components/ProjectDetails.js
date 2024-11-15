import React from 'react';
import Carousel from '../components/Carousel'; 


const ProjectDetails = ({ project }) => {
    if (!project) return null; // Avoid rendering if invalid project is passed

    return (
        <div>
            {/* Project Title */}
            <h2>{project.title}</h2>

            {/* Carousel */}
            {project.media?.length > 0 && <Carousel media={project.media} />}

            {/* Technologies */}
            {project.technologies?.length > 0 && (
                <div>
                    <h2>Technologies Used</h2>
                    <p className="tagList">
                        {project.technologies.map((tech, index) => (
                            <span key={index}>
                                {tech}{index < project.technologies.length - 1 && ' '}
                            </span>
                        ))}
                    </p>
                </div>
            )}

            {/* Description */}
            {project.description?.length > 0 && (
                <div>
                    <h2>Description</h2>
                    {project.description.map((paragraph, index) => (
                        <p style={{ textAlign: 'left' }} key={index}>{paragraph}</p>
                    ))}
                </div>
            )}

            {/* Links */}
            {project.links?.length > 0 && (
                <div>
                    <h2>Links</h2>
                    <ul className="tagList">
                        {project.links.map((link, index) => (
                            <span key={index}>
                                <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                            </span>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};


export default ProjectDetails;