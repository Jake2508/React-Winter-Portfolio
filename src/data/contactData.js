// Data for contact

export const ContactData = () => (
    <div>
        {/* Intro / Thank you */}
        <p>Hope you're having fun playing around with my website and its interactive features! <br />
            If you'd like to reach out, please feel free to contact me on any of the below methods: <br />
        </p>

        {/* Contact Methods */}
        <p>Email me at <a href="mailto:rosejake400@gmail.com">rosejake400@gmail.com</a></p>
        <p>Message me on <a href="#" onClick={(e) => { e.preventDefault(); copyToClipboard('07561042931') }}>07561 042931</a></p>
        <p>Contact me on <a href="https://www.linkedin.com/in/jake-rose123/" target="_blank">LinkedIn</a></p>
        <p>View my code on <a href="https://github.com/Jake2508?tab=repositories" target="_blank">GitHub</a></p>

        {/* CV */}
        <h2>Resume</h2>
        <div className='centerElements'>
            {/* Link & Download Options */} 
            <p> <a href="/Images/General/cv.pdf" target="_blank">View Online</a> </p>
            <img src="/Images/General/pdf-icon2.jpg" alt="PDF Icon" className='educationImage' />
            <p> <a href="/Images/General/cv.pdf" download={"Jake_Rose_CV.pdf"}>Download</a> </p>
        </div>
    </div>
);


export default ContactData;