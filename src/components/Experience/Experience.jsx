import "./Experience.css";

export default function Experience({
  company,
  url,
  logo,
  logoVariant,
  roles = [],
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

        <h2 className="experience__company">
          <a target="_blank" href={url} rel="noopener noreferrer">
            {company}
          </a>
        </h2>
      </div>
      <div className="experience__roles">
        {roles.map((role) => {
          const roleKey = `${role.title}-${role.timeframe}`;
          return (
            <div className="experience__role" key={roleKey}>
              <h3 className="experience__role-title">{role.title}</h3>
              <span className="experience__role-timeframe">
                {role.timeframe}
              </span>
            </div>
          );
        })}
      </div>

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
