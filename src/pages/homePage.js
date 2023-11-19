import React, {useState, useEffect} from "react";
import NavBar from "../components/navBar";
import Socials from "../components/socials"
import Techstack from "../components/techStack";
import Project from "../components/project";
import Skiing from "../media/Skiing.jpg";
import locpin from "../media/locPin.png"
import Loading from "../media/loadingIcon.png"
import Javascript from "../media/Javascript-Icon.png"
import Python from "../media/python-Icon.png"
import cplusplus from  "../media/C++-Icon.png"
import react from  "../media/reacr-Icon.png"
import Django from "../media/django-Icon.png"
import "../styling/homePage.css"

const HomePage = () =>{
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }, []);

    return(
        <div className="test">
            {loading?(
                <div className="loadingPage">
                    <img className="loadingImage" src={Loading}></img>
                </div>
                
            ):(
                <div className="main">
                <NavBar></NavBar>
                <div className="home">
                    <div className="personalDetails">
                        <h2>Junior Software Developer</h2>
                        <div className="location">
                            <img className="locationIcon" src={locpin}/>
                            <div className="locationText">
                            Dublin, Ireland
                            </div>
                        </div>
                        
                    </div>
                    <img className="mainPicture" src={Skiing}/>
                </div>
                <div className="socials">
                    <Socials></Socials>
                </div>
                <div>
                    <Techstack></Techstack>
                </div>
                <div className="aboutMe" id="aboutMe">
                    <h1>About Me</h1>
                    <p>Hello! I'm Stephen Byrne, a recent college graduate who is passioante about full stack development and AI. In 2022, I completed my master's degree in computer and Electronic Engineering at Trinity College Dublin. My fascination with technology has been a constant since I was a child. Engineering was always my favorite subject in school. Throughout college, my passion for software development and artificial intelligence grew.  </p>
                    <p>In the initial three years of my degree, I delved deep into the fundamentals of software, learning concepts such as data structures, algorithms, time and space complexity, and testing using languages like C++ and C#. Alongside these, I completed modules in computer networks, cybersecurity, microprocessor systems, computer graphics, augmented reality, and cyber-physical systems. The final two years saw a shift in focus towards the captivating realm of AI. I completed three modules in relation to AI—AI, Machine Learning, and Deep Learning. In these modules I gained significant experience in Python. My final year project for my masters was to design an intrusion detection system that utilized machine learning to safeguard vehicular networks against network attacks, with a hands-on deployment of models in hardware. </p>
                    <p>Since beginning my professional career and in my free time through personal projects, I've expanded my skill set to include languages and frameworks such as JavaScript, HTML, CSS, React, and Django. This additional expertise has allowed me to thrive in both personal endeavors and the professional landscape. </p>
                    <p>Beyond the realm of software development, I love spending time outdoors and have a strong passion for various sports. I cherish the simple joys of life, be it a leisurely cycle, a refreshing walk, or, weather permitting, an invigorating sea swim. Whether it's the high-octane excitement of F1, the strategic beauty of football, the discipline of MMA, or the precision of golf, I embrace the diverse world of sports. Admittedly, I dabble in both football and golf—sometimes with more enthusiasm than skill!  </p>
                </div>
                <div className="projects" id="projects">
                    <h1>Projects</h1>
                    <Project title="Full Stack Car Advertising Application" languages={[react, Javascript, Django]} description="This is a car advertisment platform similiar to carzone which enables user to advertise cars for sale. its built with a react frontend and a Django backend in combination with Amazon S3" linkToPage = "https://www.google.com/"></Project>
                </div>
                <div className="experience" id="experience">
                    <h1>Experience</h1>
                    <h3>Junior Software Developer - <a href="https://robotify.com">Robotify Ltd.</a></h3>
                    <h4>July 2022 - Present</h4>
                    <p> I have been working at Robotify Ltd. since July 2022.</p>
                    <div className="experienceList">
                        <li>Collaborate within an AGILE SCRUM environment, utilizing tools such as JIRA and MIRO to streamline project workflows.</li>
                        <li>Consult closely with the team lead to contribute innovative ideas and implement effective solutions throughout various projects.</li>
                        <li>Undertake diverse responsibilities, including the development, debugging, maintenance, and rigorous testing of code, ensuring the delivery of high-quality software products.</li>
                        <li>Pioneered the creation of a new Integrated Development Environment (IDE) with enhanced functionalities such as linting and autocomplete, significantly improving the development workflow.</li>
                        <li>Play a key role in refactoring, testing, and deploying backend course content, contributing to the overall optimization of system performance.</li>
                        <li>Conducted thorough research to identify the most suitable End-to-End (E2E) test suite for our specific needs.</li>
                        <li>Implemented Puppeteer and devised new tests, effectively replacing outdated Cypress tests and ensuring a more robust testing framework.</li>
                        <li>Conduct comprehensive unit testing and end-to-end testing on solutions, maintaining a commitment to delivering reliable and error-free software.</li>
                        <li>Generate comprehensive documentation for each project, encompassing system requirements, solutions, pros and cons, testing plans, and installation guidelines.</li>
                    </div>
                </div>
            </div>
            )
            }
        </div>
    )
}
export default HomePage