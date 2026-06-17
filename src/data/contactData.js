// Data for contact

const copyToClipboard = (text) => navigator.clipboard.writeText(text);

export const ContactData = () => (
    <div className="aboutBento">

        {/* Intro Card - full width */}
        <div className="bentoCard bentoFull contactIntro">
            <h2>Let's Chat</h2>
            <p>
                Thanks for taking the time to look through my portfolio! Whether you have a question,
                an opportunity, or just want to say hello. Feel free to reach out through any of the
                methods below.
            </p>
        </div>

        {/* Contact Links Card */}
        <div className="bentoCard">
            <h2>Get in Touch</h2>
            <div className="contactList">
                <a href="mailto:rosejake400@gmail.com" className="contactRow">
                    <span className="contactLabel">Email</span>
                    <span className="contactValue">rosejake400@gmail.com</span>
                </a>
                <a href="#" className="contactRow" onClick={(e) => { e.preventDefault(); copyToClipboard('07561042931') }}>
                    <span className="contactLabel">Phone</span>
                    <span className="contactValue">07561 042931 <span className="subInformation">(copy)</span></span>
                </a>
                <a href="https://www.linkedin.com/in/jake-rose123/" target="_blank" rel="noopener noreferrer" className="contactRow">
                    <span className="contactLabel">LinkedIn</span>
                    <span className="contactValue">jake-rose123</span>
                </a>
                <a href="https://github.com/Jake2508" target="_blank" rel="noopener noreferrer" className="contactRow">
                    <span className="contactLabel">GitHub</span>
                    <span className="contactValue">Jake2508</span>
                </a>
            </div>
        </div>

        {/* Resume Card */}
        <div className="bentoCard resumeCard">
            <h2>Resume</h2>
            <div className="resumeCardInner">
                <img src="/Images/General/pdf-icon2.png" alt="PDF" className="educationImage" />
                <div className="resumeActions">
                    <a href="/Images/General/Jake-Rose-CV.pdf" target="_blank" rel="noopener noreferrer" className="resumeBtn">View Online</a>
                    <a href="/Images/General/Jake-Rose-CV.pdf" download="Jake_Rose_CV.pdf" className="resumeBtn">Download</a>
                </div>
            </div>
        </div>

    </div>
);


export default ContactData;
