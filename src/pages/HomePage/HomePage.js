import React, {useState, useEffect} from "react";
import NavBar from "../../components/NavBar/navBar";
// import Socials from "../../components/socials"
// import Techstack from "../../components/techStack";
// import Project from "../../components/project";
import Skiing from "../../media/Skiing.jpg";
import Experience from "../../components/Experience/Experience";
// import Loading from "../media/loadingIcon.png"
// import Javascript from "../media/Javascript-Icon.png"
// import Python from "../media/python-Icon.png"
// import cplusplus from  "../media/C++-Icon.png"
// import react from  "../media/reacr-Icon.png"
// import Django from "../media/django-Icon.png"
import AboutMe from "../../components/AboutMe/AboutMe"
import "./HomePage.css"
import { motion } from "framer-motion"
import Socials from "../../components/Socials/socials";

const HomePage = () =>{
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }, []);

      const blackBox = {
        initial: {
          height: "100vh",
          bottom: 0,
        },
        animate: {
          height: 0,
          transition: {
            duration: 1.5,
            ease: [0.87, 0, 0.13, 1],
          },
        },
      };

      return (
        <div className="home-page__container">
          <div className="home-page__container--content">
            <div className="home-page__container--content-left">
              <div className="test">
                <div className="home-page__container--intro">
                  <h1 className="home-page__title--name">Stephen Byrne</h1>
                  <h2 className="home-page__title--role">Full Stack Developer</h2>
                  <p>I enjoy AI and building things for the web.</p>
                </div>
                <div className="home-page__container--picture">
                  <img className="mainPicture" src={Skiing} />
                </div>
              </div>
              <div className="home-page__navbar">
                <NavBar />
              </div>
              <div className="socials">
                  <Socials />
              </div>
            </div>
            <div className="home-page__container--content-right">
              <AboutMe />
              <Experience />
            </div>
          </div>
        </div>
      );      
}
export default HomePage