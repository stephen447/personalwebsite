import "./ExperienceHolder.css";
import Experience from "../Experience/Experience";
const description =
  "At Imagine Robotify, I have played a key role in our agile team, contributing to the development of cutting-edge web applications. My involvement spans the entire project lifecycle, including planning, development, deployment, and maintenance. Key responsibilities include:Testing: Executed comprehensive unit, integration, and end-to-end tests using Cypress and Jest to ensure high-quality, reliable applications. Deployment: Developed Dockerfiles for efficient deployment of services, facilitating streamlined and consistent releases. API Development: Engineered RESTful APIs using Express.js to enable seamless and scalable server-client communication. Front-end Development: Crafted dynamic and responsive React components, enhancing the user interface and overall user experience. Code Review: Conducted thorough code reviews for peers, ensuring adherence to best practices and maintaining code quality.";
export default function ExperienceHolder() {
  return (
    <div className="experienceholder__container" id="experience__container">
      <h1>Experience</h1>
      <Experience
        title="Junior Software Developer"
        company="Imagine Robotify"
        year="July 2023 - Present"
        description={description}
      />
    </div>
  );
}
