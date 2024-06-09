import "./techStack.css";

export default function Techstack (props) {
    let techstack = props.techStack||[]
    // convert to an arry
    techstack = Array.from(techstack)
    return(
        <div className="techstack__container">
            {/* I want a for loop cyling through an array of techstacks and creating them*/}
            {techstack.map((tech) => (
                <div className="techstack__container--technology">
                    {tech}
                </div>
            ))}
        </div>
    )
    
}