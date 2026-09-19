// Data for About tab

import React, { useState } from 'react';
import SectionLabel from '../components/SectionLabel.jsx';
import { profile, experience, education, techStack } from './siteData.js';


export const AboutData = () => (
    <div className="aboutTab">

        {/* Intro — roles live in the header bar, so they are not repeated here */}
        <section className="aboutIntro">
            <p className="aboutIntroText">{profile.intro}</p>
            <Portrait />
        </section>

        <section>
            <SectionLabel name="PROFESSIONAL EXPERIENCE" />
            <div className="aboutRows">
                {experience.map((role) => (
                    <div className="aboutRow" key={`${role.company}-${role.years}`}>
                        <span className="aboutRowYear">{role.years}</span>
                        <h3 className="aboutRowTitle">{role.role}</h3>
                        <span className="aboutRowMeta">{role.company}</span>
                    </div>
                ))}
            </div>
        </section>

        <section>
            <SectionLabel name="EDUCATION" />
            <div className="aboutRows">
                <div className="aboutRow">
                    <span className="aboutRowYear">{education.years}</span>
                    <div>
                        <h3 className="aboutRowTitle">{education.course}</h3>
                        <p className="aboutRowAward">
                            {education.institution} · {education.award}
                        </p>
                    </div>
                    <span className="aboutRowLogoCell">
                        <img
                            src={education.logo}
                            alt={education.institution}
                            className="aboutRowLogo"
                            width="34"
                            height="36"
                            decoding="async"
                        />
                    </span>
                </div>
            </div>
        </section>

        <section>
            <SectionLabel name="TECH STACK" />
            <ul className="stackRun">
                {techStack.map((item) => (
                    <li className="stackPill" key={item}>{item}</li>
                ))}
            </ul>
        </section>

    </div>
);


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
            width="132"
            height="132"
            decoding="async"
            onError={() => setFailed(true)}
        />
    );
};


export default AboutData;
