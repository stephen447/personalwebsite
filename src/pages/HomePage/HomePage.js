import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/navBar";
// import Socials from "../../components/socials"
// import Techstack from "../../components/techStack";
// import Project from "../../components/project";
// import Skiing from "../../media/Skiing.jpg";
import ExperienceHolder from "../../components/ExperienceHolder/ExperienceHolder";
// import Loading from "../media/loadingIcon.png"
// import Javascript from "../media/Javascript-Icon.png"
// import Python from "../media/python-Icon.png"
// import cplusplus from  "../media/C++-Icon.png"
// import react from  "../media/reacr-Icon.png"
// import Django from "../media/django-Icon.png"
import DownArrow from "../../media/down-arrow.gif"
import AboutMe from "../../components/AboutMe/AboutMe"
import "./HomePage.css"
import Socials from "../../components/Socials/socials";
import ProjectsHolder from "../../components/ProjectsHolder/ProjectsHolder";

const HomePage = () =>{
      const [width, setWidth] = useState(window.innerWidth);
      useEffect(() => {
        window.addEventListener("resize", () => {
          console.log(window.innerWidth)
          setWidth(window.innerWidth);
        })}, []);
        
      return (
        <div className="home-page__container">
          <div className="home-page__container--content">
            <div className="home-page__container--content-left">
              <div className="test">
                <div className="home-page__container--intro">
                  <h1 className="home-page__title--name">Stephen Byrne</h1>
                  <h2 className="home-page__title--role">Full Stack Developer @ <a target="_blank" href="https://www.imaginelearning.com/products/science/robotify/">Imagine Robotify</a></h2>
                  <p>I enjoy AI and building things for the web.</p>
                </div>
                {/* <div className="home-page__container--picture">
                  <img className="mainPicture" src={Skiing} />
                </div> */}
              </div>
              <div className="home-page__navbar">
                <NavBar />
              </div>
              <div className="socials">
                  <Socials />
                  
              </div>
              {width<1050 && <div className="arrow--container">
                <div className="arrow"/>
                <p className="arrow--text">Scroll Down</p>
              </div>}
              
              
            </div>
            <div className="home-page__container--content-right">
              <AboutMe />
              <ProjectsHolder />
              <ExperienceHolder />
            </div>
          </div>
        </div>
      );      
}
export default HomePage