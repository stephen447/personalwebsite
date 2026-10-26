import "./ExperienceHolder.css";
import Experience from "../Experience/Experience";
const serviceNowDescription = [
  <>
    Built the core agentic orchestrator for customer onboarding, enabling
    different business units to integrate their own specialised agents into an
    end-to-end onboarding experience. The solution helped reduce customers’ time
    to first use by <strong>30%</strong>.
  </>,
  "Helped lead UI development using a new internal framework built on Lit, working closely with product management to translate high-level requirements into technical plans and delivered features.",
  "Addressed engineering challenges around agent guardrails, generalisability across business units, and testing agent-driven workflows. Developed Playwright end-to-end tests to validate onboarding journeys and handled the release process to bring updates into production.",
];

const imagineLearningDescription = [
  "At Imagine Robotify, I am part of an agile team dedicated to developing cutting-edge web applications and web-based game engines. My role encompasses the entire project lifecycle, including planning, development, deployment, and maintenance.",
  "I craft dynamic and responsive React components to enhance the user interface and overall user experience. Additionally, I engineer RESTful APIs using Express.js to facilitate seamless and scalable communication between the server, clients and various AWS services.",
  "A key aspect of my work involves helping to develop a 3D browser-based game engine utilizing THREE.js and Cannon ES with an Entity-Component-System (ECS) architecture, which allows for efficient game design and development.",
  "I execute comprehensive unit, integration, and end-to-end testing using Cypress and Jest to ensure our applications are of the highest quality and reliability. Furthermore, I use Docker to streamline the deployment of services, ensuring consistent and reliable application updates.",
  "To uphold code quality and adhere to best practices, I conduct thorough code reviews for my peers.",
];
export default function ExperienceHolder() {
  return (
    <div className="experienceholder__container" id="experience__container">
      <h1>Experience</h1>
      <Experience
        title="Software Engineer"
        company="ServiceNow"
        url="https://www.servicenow.com/"
        year="June 2025 - Present"
        description={serviceNowDescription}
      />
      <Experience
        title="Junior Software Developer"
        company="Imagine Robotify"
        url="https://www.imaginelearning.com/products/science/robotify/"
        year="July 2023 - June 2025"
        description={imagineLearningDescription}
      />
    </div>
  );
}
