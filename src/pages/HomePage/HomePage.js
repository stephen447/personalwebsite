import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/navBar";
import ExperienceHolder from "../../components/ExperienceHolder/ExperienceHolder";
import AboutMe from "../../components/AboutMe/AboutMe";
import "./HomePage.css";
import Socials from "../../components/Socials/socials";
import ProjectsHolder from "../../components/ProjectsHolder/ProjectsHolder";

const HomePage = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      console.log(window.innerWidth);
      setWidth(window.innerWidth);
    });
  }, []);

  return (
    <div className="home-page__container">
      <div className="home-page__container--content">
        <div className="home-page__container--content-left">
          <div className="test">
            <div className="home-page__container--intro">
              <h1 className="home-page__title--name">Stephen Byrne</h1>
              <h2 className="home-page__title--role">
                Software Engineer @{" "}
                <a target="_blank" href="https://www.servicenow.com/">
                  ServiceNow
                </a>
              </h2>
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
          {width < 1050 && (
            <div className="arrow--container">
              <div className="arrow" />
              <p className="arrow--text">Scroll Down</p>
            </div>
          )}
        </div>
        <div className="home-page__container--content-right">
          <AboutMe />
          <ProjectsHolder />
          <ExperienceHolder />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
