import React from "react"
import "./navBar.css"
export default function NavBar () {
    /**
     * This function scrolls to the section of the page that matches the target ID
     * @param {*} event 
     */
    function scrollToSection(event) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').slice(1); // Get the target section ID
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    return(
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <a href="#about-me" onClick={scrollToSection}>About Me</a>
                </div>
                <div className="nav-container">
                    <a href="#project__container" onClick={scrollToSection} >Projects</a>
                </div>
                <div className="nav-container">
                    <a href="#experience__container" onClick={scrollToSection}>Experience</a>
                </div>
            </nav>
        </>
    )
    
}
