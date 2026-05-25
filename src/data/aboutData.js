// Data for About tab

export const AboutData = () => (
    <div className="aboutBento">

        {/* Bio Card - full width */}
        <div className="bentoCard bentoFull">
            <h2>About</h2>
            <p>
                I'm Jake, a Software Developer with a focus on C# and .NET. 
                My day-to-day spans internal tooling, monitoring services, and automated pipelines, 
                working across technical design, code reviews, and systems built to scale.
            </p>
            <p>
                Outside work I enjoy web and game development.
                This portfolio showcases those independent projects.
            </p>
        </div>

        {/* Education Card */}
        <div className="bentoCard">
            <h2>Education</h2>
            <div className='educationContainer'>
                <div>
                    <h4>BSc Computer Games Design & Programming</h4>
                    <p>
                        <a href="https://www.staffs.ac.uk/course/computer-games-design-programming-bsc" target='_blank' rel='noopener noreferrer'>
                            Staffordshire University
                        </a>
                    </p>
                    <p className='subInformation'>First-Class Honours (82%)</p>
                </div>
                <a href="https://www.staffs.ac.uk/" target='_blank' rel='noopener noreferrer'>
                    <img src="/Images/General/staffs-logo.png" alt="Staffordshire University" className='educationImage' />
                </a>
            </div>
        </div>

        {/* Languages Card */}
        <div className="bentoCard">
            <h2>Languages</h2>
            <div className="skillsGrid">
                <div className="skillItem">
                    <span className="skillName">C# / .NET</span>
                    <span className="subInformation skillDetail">3+ yrs · Professional — tooling, services & pipelines</span>
                </div>
                <div className="skillItem">
                    <span className="skillName">JS / HTML / CSS</span>
                    <span className="subInformation skillDetail">Portfolio · Three.js & React</span>
                </div>
                <div className="skillItem">
                    <span className="skillName">SQL</span>
                    <span className="subInformation skillDetail">Professional · PostgreSQL & MySQL</span>
                </div>
            </div>
        </div>

        {/* Bonuses Card - full width */}
        <div className="bentoCard bentoFull">
            <h2>Tools & Tech</h2>
            <ul className='bonusList'>
                <li>Azure DevOps</li>
                <li>Kubernetes & Docker</li>
                <li>Grafana & Kibana</li>
                <li>REST APIs</li>
                <li>Selenium</li>
                <li>Version Control</li>
            </ul>
        </div>

    </div>
);


export default AboutData;
