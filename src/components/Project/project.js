import "./project.css"
import Techstack from "../TechStack/techStack"
export default function Project (props) {
    return(
        <div className="project__container">
            <h2 className="project__title">{props.title}</h2>
            <p className="project__year">{props.year}</p>
            <p className="project__description">{props.description}</p>
            <div className="project__techstack">{props.techstack}</div>
            <Techstack techStack={props.techStack}></Techstack>
        </div>
    )
    
}
