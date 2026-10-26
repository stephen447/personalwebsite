import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/navBar";
import ExperienceHolder from "../../components/ExperienceHolder/ExperienceHolder";
import AboutMe from "../../components/AboutMe/AboutMe";
import "./HomePage.css";
import Socials from "../../components/Socials/socials";
import ProjectsHolder from "../../components/ProjectsHolder/ProjectsHolder";
import portrait from "../../media/Skiing.jpg";

const dublinTime = new Intl.DateTimeFormat("en-IE", {
  timeZone: "Europe/Dublin",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const HomePage = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
          <div className="home-page__intro-row">
            <img
              className="home-page__portrait"
              src={portrait}
              alt="Stephen Byrne"
              width="160"
              height="160"
            />
            <div className="home-page__container--intro">
              <h1 className="home-page__title--name">Stephen Byrne</h1>
              <h2 className="home-page__title--role">
                Software Engineer @{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.servicenow.com/"
                >
                  ServiceNow
                </a>
              </h2>
              <p>I enjoy AI and building things for the web.</p>
              <div className="home-page__location-time">
                <span>
                  <span aria-hidden="true">🇮🇪</span> Dublin, Ireland
                </span>
                <time
                  dateTime={now.toISOString()}
                  aria-label={`Local time in Dublin: ${dublinTime.format(now)}`}
                >
                  {dublinTime.format(now)} local time
                </time>
              </div>
            </div>
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
