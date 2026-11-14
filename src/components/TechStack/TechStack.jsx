import './TechStack.css';

/**
 * Render the technologies associated with a project.
 * @param {{ techStack?: Iterable<string> }} props Project technologies.
 * @returns {import('react').ReactElement} Technology list.
 */
export default function TechStack(props) {
  let techstack = props.techStack || [];
  // convert to an arry
  techstack = Array.from(techstack);
  return (
    <div className="techstack__container">
      {techstack.map((tech) => (
        <div className="techstack__container--technology" key={tech}>
          {tech}
        </div>
      ))}
    </div>
  );
}
