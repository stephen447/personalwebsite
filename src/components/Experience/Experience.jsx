import "./Experience.css";

export default function Experience({ title, company, url, year, description = [] }) {
  return (
    <div className="experience__container">
      <h2 className="experience__title">
        {title} @{" "}
        <a target="_blank" href={url} rel="noopener noreferrer">
          {company}
        </a>
      </h2>
      <p className="experience__year">{year}</p>
      {description.map((paragraph, index) => (
        <p className={index === 0 ? "experience__description" : undefined} key={index}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}
