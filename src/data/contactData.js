// Data for contact

import React from 'react';
import SectionLabel from '../components/SectionLabel.jsx';
import { LinkedInIcon, GitHubIcon, ItchIoIcon, MailIcon, PhoneIcon } from '../components/ContactIcons.jsx';
import { socials } from './panelData.js';

// `hint` names the gesture ("tap" is phone-only, "click" is desktop-only) and
// only surfaces in the row's accessible name — the gutter label stays short.
export const contactPrimary = [
    { label: 'Email', hint: 'opens mail app', value: 'rosejake400@gmail.com', href: 'mailto:rosejake400@gmail.com' },
    { label: 'Phone', hint: 'starts a call',  value: '07561 042931',          href: 'tel:+447561042931' },
];

// panelData.js's preload list needs this too, hence the export.
export const cv = {
    title: 'Jake Rose — CV',
    meta: 'PDF · 1 page',
    url: '/Files/Jake-Rose-CV.pdf',
    icon: '/Images/General/pdf-icon.png',
};

const DIRECT_ICON = { Email: MailIcon, Phone: PhoneIcon };

const SOCIAL_ICON = {
    LinkedIn: { Icon: LinkedInIcon, className: 'contactIconLinkedin' },
    GitHub:   { Icon: GitHubIcon,   className: 'contactIconGithub' },
    'itch.io': { Icon: ItchIoIcon,  className: 'contactIconItch' },
};


export const ContactData = () => (
    <div className="contactTab">

        {/* Availability and location are not repeated here — they live in the tab bar */}
        <p className="contactIntro">
            Thanks for looking through, I&apos;m open to roles in software
            development, games and QA. Email is the quickest way to reach me,
            or call direct.
        </p>

        <section className="panelSection">
            <SectionLabel name="Direct" />
            <div className="contactRows">
                {contactPrimary.map((item) => {
                    const Icon = DIRECT_ICON[item.label];
                    return (
                        <a
                            key={item.label}
                            href={item.href}
                            className="contactRow"
                            aria-label={`${item.label}: ${item.value}, ${item.hint}`}
                        >
                            <span className="contactRowLabel">{item.label}</span>
                            <span className="contactIconSquare contactIconAccent">
                                <Icon />
                            </span>
                            <span className="contactRowValue contactRowValueAccent">
                                {item.value}
                                <span className="contactRowArrow" aria-hidden="true">↗</span>
                            </span>
                        </a>
                    );
                })}
            </div>
        </section>

        <section className="panelSection">
            <SectionLabel name="Find Me Online" />
            <div className="contactRows">
                {socials.map((social) => {
                    const { Icon, className } = SOCIAL_ICON[social.label];
                    return (
                        <a
                            key={social.label}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contactRow"
                            aria-label={`${social.label}: ${social.handle} (opens in new tab)`}
                        >
                            <span className="contactRowLabel">{social.label}</span>
                            <span className={`contactIconSquare ${className}`}>
                                <Icon />
                            </span>
                            <span className="contactRowValue">
                                {social.handle}
                                <span className="contactRowArrow" aria-hidden="true">↗</span>
                            </span>
                        </a>
                    );
                })}
            </div>
        </section>

        <div className="cvRow">
            <img src={cv.icon} alt="" className="cvIcon" width="38" height="38" decoding="async" />
            <div className="cvMeta">
                <span className="cvTitle">{cv.title}</span>
                <span className="cvSubtitle">{cv.meta}</span>
            </div>
            <div className="cvActions">
                <a href={cv.url} target="_blank" rel="noopener noreferrer" className="btn btnSecondary">
                    View<span className="visuallyHidden"> (opens in new tab)</span>
                </a>
                <a href={cv.url} download="Jake_Rose_CV.pdf" className="btn btnPrimary">Download</a>
            </div>
        </div>

    </div>
);


export default ContactData;
