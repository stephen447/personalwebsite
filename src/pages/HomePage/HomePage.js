import React, {useState, useEffect} from "react";
import NavBar from "../../components/NavBar/navBar";
// import Socials from "../../components/socials"
// import Techstack from "../../components/techStack";
// import Project from "../../components/project";
import Skiing from "../../media/Skiing.jpg";
import locpin from "../../media/locPin.png"
// import Loading from "../media/loadingIcon.png"
// import Javascript from "../media/Javascript-Icon.png"
// import Python from "../media/python-Icon.png"
// import cplusplus from  "../media/C++-Icon.png"
// import react from  "../media/reacr-Icon.png"
// import Django from "../media/django-Icon.png"
import AboutMe from "../../components/AboutMe/AboutMe"
import "./HomePage.css"
import { motion } from "framer-motion"

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

    return(
        <div className="home-page__container">
            <NavBar></NavBar>
            <div className="home-page__container--content">
                <div className="home-page__container--content-left">
                    <h2>Hi, Im Stephen Byrne. A developer.</h2>
                    <p>I enjoy building things for the web and mobile.</p>
                    <div className="location">
                        <img className="locationIcon" src={locpin}/>
                        <div className="locationText">
                        Dublin, Ireland
                        </div>
                    </div>
                    <img className="mainPicture" src={Skiing}/>
                </div>
                <div className="home-page__container--content-right">
                    <AboutMe></AboutMe>
                </div>
            </div>
        </div>
    )
}
export default HomePage