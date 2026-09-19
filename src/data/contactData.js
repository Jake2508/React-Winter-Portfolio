// Data for contact

import React from 'react';
import SectionLabel from '../components/SectionLabel.jsx';
import { contactIntro, contactPrimary, socials, cv } from './siteData.js';


export const ContactData = () => (
    <div className="contactTab">

        {/* Availability and location are not repeated here — they live in the tab bar */}
        <p className="contactIntro">{contactIntro}</p>

        <section className="contactPrimaryGrid">
            {contactPrimary.map((item) => (
                <a key={item.label} href={item.href} className="contactTile">
                    <span className="contactTileLabel">{item.label}</span>
                    <span className="contactTileValue">{item.value}</span>
                </a>
            ))}
        </section>

        <section>
            <SectionLabel name="SOCIALS" />
            <div className="contactRows">
                {socials.map((social) => (
                    <a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contactRow"
                    >
                        <span className="contactLabel">{social.label}</span>
                        {/* Full URL stays visible — recruiters and ATS filters distrust bare labels */}
                        <span className="contactValue">{social.url}</span>
                    </a>
                ))}
            </div>
        </section>

        <section>
            <SectionLabel name="CV" />
            <div className="cvRow">
                <img src={cv.icon} alt="" className="cvIcon" width="38" height="38" decoding="async" />
                <div>
                    <h3 className="cvTitle">{cv.title}</h3>
                    <p className="cvMeta">{cv.meta}</p>
                </div>
                <div className="cvActions">
                    <a href={cv.url} target="_blank" rel="noopener noreferrer" className="cvBtn">View</a>
                    <a href={cv.url} download="Jake_Rose_CV.pdf" className="cvBtn">Download</a>
                </div>
            </div>
        </section>

    </div>
);


export default ContactData;
