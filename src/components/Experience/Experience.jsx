import "./Experience.css";

export default function Experience({
  title,
  company,
  url,
  logo,
  logoVariant,
  year,
  description = [],
}) {
  return (
    <div className="experience__container">
      <div className="experience__header">
        {logo && (
          <img
            className={`experience__logo${logoVariant ? ` experience__logo--${logoVariant}` : ""}`}
            src={logo}
            alt={`${company} logo`}
          />
        )}

        <h2 className="experience__title">
          {title} @{" "}
          <a target="_blank" href={url} rel="noopener noreferrer">
            {company}
          </a>
        </h2>
      </div>
      <p className="experience__year">{year}</p>
      {description.map((paragraph, index) => (
        <p
          className={index === 0 ? "experience__description" : undefined}
          key={index}
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}
