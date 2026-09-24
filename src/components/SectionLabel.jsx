import React from 'react';

/*
  Shared section heading: a title (optional inline count) with a short accent
  bar beneath it. `trailing` renders at the far right of the row — the
  projects tab uses it for a carousel's pager arrows.
*/
const SectionLabel = ({ name, count, trailing }) => (
    <div className="sectionHeading">
        <div className="sectionHeadingMain">
            <div className="sectionHeadingRow">
                <span className="sectionHeadingTitle">{name}</span>
                {count && <span className="sectionHeadingCount" aria-live="polite">{count}</span>}
            </div>
            <span className="sectionHeadingBar" aria-hidden="true" />
        </div>
        {trailing}
    </div>
);


export default SectionLabel;
