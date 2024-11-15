// Data for About tab (A lot of this will remain static)

export const AboutData = () => (
    <div>
        {/* Introduction & About */}
        <p>
            Welcome! I'm Jake, an aspiring games developer currently working as a QA Tester at West Pier Studio. <br /><br />

            For me, development is an iterative process that thrives on building, refining, and confidently sharing ideas.
            I'm enthusiastic about my work always aiming to innovate. <br /><br />

            I enjoy writing clean code, designing feature mechanics, and supporting others to achieve the same.
            Learning from new insights and techniques continues to shape and enhance my approaches. <br /><br />

            This portfolio reflects my passion for game development, showcasing skills in coding, design, and
            3D modeling. My primary interests lie in procedural generation, roguelikes, and arcade-style games.
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
                <img src="/Images/staffs-logo.jpg" alt="Staffordshire University" className='educationImage' /> 
            </a>
        </div>

        {/* Programming Language Experiences */}
        <h2>Experience</h2>
        <h4>C#</h4>
        <p>
            Studied 3+ years at University. Professional industry experience at my current role creating Unit & Automation tests and making changes when relevant.
        </p>
        <h4>Javascript / HTML / CSS</h4>
        <p>
            Experience from setting up my portfolio which utilises the Three JS & React libraries. Custom HTML and CSS code was added to create the UI elements.
        </p>
        <h4>C++</h4>
        <p>Surface level knowledge gained at university.</p>

        {/* Bonus Information & Skills */}
        <h2>Bonuses</h2>
        <ul className='bonusList'>
            <li>Version Control</li>
            <li>Agile Background</li>
            <li>Pull Requests</li>
            <li>Postman API Testing</li>
            <li>NUnit</li>
            <li>Selenium Web Driver</li>
        </ul>
    </div>
);


export default AboutData;