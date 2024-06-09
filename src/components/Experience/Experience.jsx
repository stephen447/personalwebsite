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
        At Imagine Robotify, I'm a apart of an agile team, contributing to the
        development of cutting-edge web applications. My involvement spans the
        entire project lifecycle, including planning, development, deployment,
        and maintenance. Key responsibilities include:
      </p>
      <p>
        Testing: Executed comprehensive unit, integration, and end-to-end tests
        using Cypress and Jest to ensure high-quality, reliable applications.
      </p>
      <p>
        Deployment: Developed Dockerfiles for efficient deployment of services,
        facilitating streamlined and consistent releases.
      </p>
      <p>
        API Development: Engineered RESTful APIs using Express.js to enable
        seamless and scalable server-client communication.
      </p>
      <p>
        Front-end Development: Crafted dynamic and responsive React components,
        enhancing the user interface and overall user experience.
      </p>
      <p>
        Code Review: Conducted thorough code reviews for peers, ensuring
        adherence to best practices and maintaining code quality.
      </p>
    </div>
  );
}
