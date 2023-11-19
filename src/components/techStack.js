import "./techStack.css";
import React, { useState } from "react";
import Javascript from "../media/Javascript-Icon.png"
import Python from "../media/python-Icon.png"
import cplusplus from  "../media/C++-Icon.png"
import react from  "../media/reacr-Icon.png"
import Django from "../media/django-Icon.png"

export default function Techstack () {
    return(
        <div className="techstack">
            <img src={Javascript}></img>
            <img src={Python}></img>
            <img src={cplusplus}></img>
            <img src={react}></img>
            <img src={Django}></img>
        </div>
    )
    
}