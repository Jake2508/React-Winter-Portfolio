import React from 'react';

/*
  Shared section heading: [ NAME ] followed by a hairline that fills the row.
  `children` sits between the label and the rule (the projects tab puts its
  range counter there); `trailing` sits after it (the carousel arrows).
*/
const SectionLabel = ({ name, className = 'sectionLabel', children, trailing }) => (
    <div className={className}>
        <span className="sectionLabelText">[ {name} ]</span>
        {children}
        <span className="sectionLabelRule" aria-hidden="true" />
        {trailing}
    </div>
);


export default SectionLabel;
