import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import Javascript from "../media/Javascript-Icon.png"
import Python from "../media/python-Icon.png"
import cplusplus from  "../media/C++-Icon.png"
import react from  "../media/reacr-Icon.png"
import Django from "../media/django-Icon.png"
import "./project.css"
export default function Project (props) {
    // Props - title, languages, picture,
    let languagesList = [];
    props.languages.forEach(element => {
        console.log(element);
        languagesList.push(<img src={element}></img>)
    });
    console.log("Language list:",languagesList)
    return(
        <div className="mainProject">
            <a href={props.linkToPage}><h1>{props.title}</h1></a>
            <div className="projectDescription">
                <p className="description">{props.description}</p>
                <img src={Javascript}></img>
            </div>
            
            <div className="languagesList">
                {languagesList}
            </div>
            
        </div>
    )
    
}
