import "./ExperienceHolder.css";
import Experience from "../Experience/Experience";
import ServiceNowLogo from "../../media/Servicenow.png";
import RobotifyLogo from "../../media/Robotify Logo.png";
const serviceNowDescription = [
  "I’m part of the Impact team, working on ServiceNow Otto for Setup. I joined at the outset and have helped build the product from the ground up, developing agentic onboarding and configuration experiences that help customers get more value from ServiceNow. My work spans the full development lifecycle, including agent development, frontend and backend engineering, testing, support, and releases.",
  "I helped build the core onboarding orchestrator agent, enabling business units to integrate specialised configuration agents into a unified experience. This involved developing agent prompts and tools, adapting behaviour across model providers, and addressing challenges around guardrails, AI evaluation, and differing product requirements. The overall solution helped reduce customers’ time to first use by 30%.",
  "I’m currently helping lead development of the second-generation UI using a new internal framework built on Lit. I work closely with product management and business units around the world to translate high-level requirements into technical plans and working features. This work aims to accelerate development through AI tooling and strengthen integration between the UI and agent chat experience.",
  "I built Playwright end-to-end tests to validate onboarding journeys and carry out functional, performance, accessibility, and localisation testing. I also helped establish SonarQube checks, reusable development skills, and pull request review practices to improve code quality and developer productivity. My release responsibilities include generating builds, validating release readiness, and coordinating delivery with business units and program management.",
  "Alongside development, I work directly with customers to investigate and resolve support cases, help onboard new engineers, and coordinate work across multiple projects within a global team.I also take on Scrum Master responsibilities, managing user stories and facilitating Scrum ceremonies to support planning and delivery. Alongside this, I’ve contributed AI-focused content to the team’s learning and development framework.",
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
      <h1 className="experienceholder__title">Experience</h1>
      <Experience
        company="ServiceNow"
        url="https://www.servicenow.com/"
        logo={ServiceNowLogo}
        roles={[
          {
            title: "Software Engineer",
            timeframe: "June 2025 - Present",
          },
        ]}
        description={serviceNowDescription}
        skillCategories={[
          {
            name: "Architecture & Delivery",
            skills: [
              "Software Architecture",
              "Release Management",
              "Technical Planning",
              "Cross-Project Delivery",
            ],
          },
          {
            name: "AI",
            skills: [
              "Agent & Skill Development",
              "AI Evaluation",
              "MCP",
              "Prompt Engineering",
              "Multi-Model Integration",
            ],
          },
          {
            name: "Frontend",
            skills: ["UI Development", "Lit", "Accessibility", "Localisation"],
          },
          {
            name: "Backend",
            skills: ["API Development", "Data Model/Schema"],
          },
          {
            name: "Testing & Quality",
            skills: [
              "End-to-End Testing",
              "Unit Testing",
              "Playwright",
              "Code Reviews",
              "Performance Testing",
            ],
          },
        ]}
      />
      <Experience
        company="Imagine Robotify"
        url="https://www.imaginelearning.com/products/science/robotify/"
        logo={RobotifyLogo}
        logoVariant="wordmark"
        roles={[
          {
            title: "Software Developer",
            timeframe: "January 2025 - June 2025",
          },
          {
            title: "Junior Software Developer",
            timeframe: "July 2023 - January 2025",
          },
        ]}
        description={imagineLearningDescription}
        skillCategories={[
          {
            name: "Frontend & 3D",
            skills: [
              "React",
              "THREE.js",
              "Cannon ES",
              "Entity-Component-System",
              "Game engine development",
            ],
          },
          {
            name: "Backend & cloud",
            skills: ["Express.js", "REST APIs", "AWS"],
          },
          {
            name: "Testing & delivery",
            skills: ["Cypress", "Jest", "Docker", "Code reviews"],
          },
        ]}
      />
    </div>
  );
}
