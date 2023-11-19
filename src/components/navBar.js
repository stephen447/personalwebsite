import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import "./navBar.css"
export default function NavBar () {
    return(
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <a href="#home">Home</a>
                </div>
                <div className="nav-container">
                    <a href="#aboutMe">About Me</a>
                </div>
                <div className="nav-container">
                    <a href="#projects">Projects</a>
                </div>
                <div className="nav-container">
                    <a href="#experience">Experience</a>
                </div>
            </nav>
        </>
    )
    
}
