// Data for About tab

import React, { useState } from 'react';
import SectionLabel from '../components/SectionLabel.jsx';
import { profile } from './panelData.js';

// panelData.js's preload list needs this too, hence the export.
export const timeline = [
    {
        years: '2025-26',
        role: 'Software Engineer in Test',
        company: 'Smartodds, London',
        logo: '/Images/Logos/smartodds.png',
    },
    {
        years: '2024-25',
        role: 'QA Tester',
        company: 'West Pier Studio, Brighton',
        logo: '/Images/Logos/westpier.png',
    },
    {
        years: '2020-23',
        role: 'BSc (Hons) Computer Games Design & Programming',
        company: 'Staffordshire University · First Class Honours (82%)',
        logo: '/Images/Logos/staffordshire.png',
    },
    {
        years: '2019-20',
        role: 'QA Technician',
        company: 'Codemasters, Southam',
        logo: '/Images/Logos/codemasters.png',
    },
];

// Ordered languages -> tools -> creative, rendered as one continuous run.
export const techStack = [
    'C#', '.NET', 'SQL', 'Blazor', 'HTML', 'CSS',
    'Azure DevOps', 'Kubernetes', 'Docker', 'CI/CD', 'Git', 'Postman', 'Grafana', 'Kibana',
    'Unity', 'Unreal Engine', 'Blueprint', 'Blender',
];


export const AboutData = () => (
    <div className="aboutTab">

        {/* Intro — roles live in the header bar, so not repeated here */}
        <section className="aboutIntro">
            <div className="aboutIntroText">
                <p>
                    Hi I&apos;m Jake, I&apos;m a C# developer experienced building internal
                    tools, services, automation pipelines and games.
                </p>
                <p>
                    I&apos;ve worked across software development, games and QA with an
                    interest in creative software with visual design.
                </p>
            </div>
            <Portrait />
        </section>

        <section className="panelSection">
            <SectionLabel name="Experience & Education" />
            <div className="timeline">
                <span className="timelineLine" aria-hidden="true" />
                {timeline.map((item) => (
                    <div className="timelineRow" key={`${item.company}-${item.years}`}>
                        <span className="timelineYear">{item.years}</span>
                        <TimelineLogo src={item.logo} company={item.company} />
                        <div className="timelineBody">
                            <span className="timelineTitle">{item.role}</span>
                            <span className="timelineMeta">{item.company}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        <section className="panelSection">
            <SectionLabel name="Tech Stack" />
            <ul className="stackRun">
                {techStack.map((item) => (
                    <li className="stackPill" key={item}>{item}</li>
                ))}
            </ul>
        </section>

    </div>
);


/*
  Timeline logo. Decorative — the company/institution name already sits right
  beside it — so it carries alt="" and falls back to a monogram if the file
  fails to load rather than showing a broken image.
*/
const TimelineLogo = ({ src, company }) => {
    const [failed, setFailed] = useState(false);

    if (failed) {
        const initials = company.replace(/,.*$/, '').split(' ')
            .slice(0, 2).map((word) => word[0]).join('');
        return (
            <span className="timelineLogoSlot">
                <span className="timelineLogo timelineLogoFallback" aria-hidden="true">{initials}</span>
            </span>
        );
    }

    return (
        <span className="timelineLogoSlot">
            <img
                src={src}
                alt=""
                className="timelineLogo"
                width="22"
                height="22"
                decoding="async"
                onError={() => setFailed(true)}
            />
        </span>
    );
};


// Falls back to a monogram until a real headshot exists at profile.portrait
const Portrait = () => {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return (
            <div className="aboutPortrait aboutPortraitFallback" aria-hidden="true">JR</div>
        );
    }

    return (
        <img
            src={profile.portrait}
            alt={profile.name}
            className="aboutPortrait"
            width="112"
            height="112"
            decoding="async"
            onError={() => setFailed(true)}
        />
    );
};


export default AboutData;
