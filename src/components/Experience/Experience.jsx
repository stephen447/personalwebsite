import "./Experience.css";
export default function Experience(props) {
  return (
    <div className="experience__container">
      <h2 className="experience__title">
        {props.title} @{" "}
        <a
          target="_blank"
          href="https://www.imaginelearning.com/products/science/robotify/"
          rel="noreferrer"
        >
          {props.company}
        </a>
      </h2>
      <p className="experience__year">{props.year}</p>
      <p className="experience__description">
        At Imagine Robotify, I am part of an agile team dedicated to developing
        cutting-edge web applications and web-based game engines. My role
        encompasses the entire project lifecycle, including planning,
        development, deployment, and maintenance.
      </p>
      <p>
        I craft dynamic and responsive React components to enhance the user
        interface and overall user experience. Additionally, I engineer RESTful
        APIs using Express.js to facilitate seamless and scalable communication
        between the server, clients and various AWS services.
      </p>
      <p>
        A key aspect of my work involves helping to develop a 3D browser-based
        game engine utilizing THREE.js and Cannon.js with an
        Entity-Component-System (ECS) architecture, which allows for efficient
        game design and development.
      </p>
      <p>
        I execute comprehensive unit, integration, and end-to-end testing using
        Cypress and Jest to ensure our applications are of the highest quality
        and reliability. Furthermore, I use Docker to streamline the deployment
        of services, ensuring consistent and reliable application updates.
      </p>
      <p>
        To uphold code quality and adhere to best practices, I conduct thorough
        code reviews for my peers.
      </p>
    </div>
  );
}
