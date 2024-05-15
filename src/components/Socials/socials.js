import React, { useState } from "react";
import Email from "../../media/email.png"
import LinkedIn from "../../media/linkedIn.png"
import GitHub from "../../media/github.png"
import "./socials.css"
export default function Socials () {
    return(
        <>
            <div className="social">
                <div className="socialElement">
                    <a href="mailto: sdavidbyrne@gmail.com"> <img className="socialIcons" src={Email}/></a>
                    <p> sdavidbyrne@gmail.com</p>
                </div>
                <div className="socialElement">
                    <a href="https://www.linkedin.com/in/stephen-byrne-b4729321b/"><img className="socialIcons" src={LinkedIn}/></a>
                </div>
                <div className="socialElement">
                    <a href="https://github.com/stephen447"><img className="socialIcons" src={GitHub}/></a>
                </div> 
            </div>
        </>
    )
    
}