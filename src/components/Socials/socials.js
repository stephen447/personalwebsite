import React from "react";
import Email from "../../media/email.png"
import LinkedIn from "../../media/linkedIn.png"
import GitHub from "../../media/github.png"
import "./socials.css"
export default function Socials () {
    return(
        <>
            <div className="social">
                <div className="socialElement">
                    <a href="mailto: sdavidbyrne@gmail.com"> <img alt="" className="socialIcons" src={Email}/></a>
                    <p> sdavidbyrne@gmail.com</p>
                </div>
                <div className="socialElement">
                    <a href="https://www.linkedin.com/in/stephen-byrne-b4729321b/" target="_blank" rel="noreferrer"><img className="socialIcons" alt="" src={LinkedIn}/></a>
                </div>
                <div className="socialElement">
                    <a href="https://github.com/stephen447" target="_blank" rel="noreferrer"><img className="socialIcons" alt=""src={GitHub}/></a>
                </div> 
            </div>
        </>
    )
    
}