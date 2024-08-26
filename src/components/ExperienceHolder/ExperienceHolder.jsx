import "./ExperienceHolder.css";
import Experience from "../Experience/Experience";
const description =
  "At Imagine Robotify, I am part of an agile team dedicated to developing cutting-edge web applications and web-based game engines. My role encompasses the entire project lifecycle, including planning, development, deployment, and maintenance. I craft dynamic and responsive React components to enhance the user interface and overall user experience. Additionally, I engineer RESTful APIs using Express.js to facilitate seamless and scalable communication between the server, clients and various AWS services.A key aspect of my work involves helping to develop a 3D browser-based game engine utilizing THREE.js and Cannon.js with an Entity-Component-System (ECS) architecture, which allows for efficient game design and development.I execute comprehensive unit, integration, and end-to-end testing using Cypress and Jest to ensure our applications are of the highest quality and reliability. Furthermore, I use Docker to streamline the deployment of services, ensuring consistent and reliable application updates.To uphold code quality and adhere to best practices, I conduct thorough code reviews for my peers, fostering a collaborative environment focused on excellence.";
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
