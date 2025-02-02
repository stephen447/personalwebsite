import "./project.css";
import Techstack from "../TechStack/techStack";
import linkIcon from "../../media/linkIcon.png";

export default function Project(props) {
    const { title, year, description, techstack, techStack, url } = props;

    const projectContent = (
        <div className="project__container">
            <div className="title__container">
                <h2 className="project__title">{title}</h2>
                {url && (
                    <div className="project__link">
                        <img  className="project__image--link" src={linkIcon}/>
                </div>)}

            </div>
            
            <p className="project__year">{year}</p>
            
            
            <p className="project__description">{description}</p>
            <div className="project__techstack">{techstack}</div>
            <Techstack techStack={techStack}></Techstack>
            
                    
        </div>
    );

    return url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" className="project__link">
            {projectContent}
        </a>
    ) : (
        projectContent
    );
}
