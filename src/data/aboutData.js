// Data for About tab

export const AboutData = () => (
    <div>
        {/* Introduction & About */}
        <p>
            Welcome! I'm Jake, a software developer with experience in QA, test automation, full-stack development, and programming. <br /><br />

            While C# and .NET are my main focus, I've built skills in various other technologies over the years.
            In my current Software Engineer in Test role, I build internal tooling, monitoring services, and automated pipelines to streamline workflows and improve software quality. <br /><br />

            I thrive in Agile environments, contributing to code reviews, technical design discussions, and debugging alongside developers to build scalable solutions.
            I enjoy problem-solving, optimising processes, and writing clean, maintainable code. <br /><br />

            This portfolio highlights my work in software development, web technologies, and independent projects. 
            I also enjoy designing and developing games, applying my skills in innovative ways.
        </p>

        {/* Education Section */}
        <h2>Education</h2>
        <div className='educationContainer'>
            <div>
                {/* Degree Course */}
                <h4>BSc Computer Games Design and Programming</h4>
                <p>
                    {/* Uni Course Link */}
                    <a href="https://www.staffs.ac.uk/course/computer-games-design-programming-bsc" target='_blank' rel='noopener noreferrer'>
                        Staffordshire University
                    </a>
                </p>
                <p className='subInformation'>Graduation Grade: 82</p>
            </div>
            {/* Uni Logo Image Link */}
            <a href="https://www.staffs.ac.uk/" target='_blank' rel='noopener noreferrer'>
                <img src="/Images/General/staffs-logo.png" alt="Staffordshire University" className='educationImage' /> 
            </a>
        </div>

        {/* Programming Language Experiences */}
        <h2>Experience</h2>
        <h4 className="subInformation">C#</h4>
        <p>
            Studied 3+ years at University. Professional experience building internal tools, background services, and automated pipelines in my current Software Engineer in Test role.
        </p>
        <h4 className="subInformation">Javascript / HTML / CSS</h4>
        <p>
            Experience from setting up my portfolio which utilises the Three JS & React libraries. Custom HTML and CSS code was added to create the UI elements.
        </p>
        <h4 className="subInformation">SQL</h4>
        <p> 
            Professional experience with PostgreSQL and MySQL, writing queries for data analysis and validation across multiple environments.
        </p>

        {/* Bonus Information & Skills */}
        <h2>Bonuses</h2>
        <ul className='bonusList'>
            <li>Azure DevOps</li>
            <li>Kubernetes & Docker</li>
            <li>Grafana & Kibana</li>
            <li>REST APIs</li>
            <li>Selenium</li>
            <li>Version Control</li>
        </ul>
    </div>
);


export default AboutData;