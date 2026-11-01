import { useState } from "react";
import "./Experience.css";

const VISIBLE_SKILL_COUNT = 6;

export default function Experience({
  company,
  url,
  logo,
  logoVariant,
  roles = [],
  description = [],
  skillCategories = [],
}) {
  const [skillsExpanded, setSkillsExpanded] = useState(false);
  const totalSkills = skillCategories.reduce(
    (total, category) => total + category.skills.length,
    0,
  );
  const visibleSkillCategories = skillCategories.reduce(
    (visibleCategories, category) => {
      const remainingCount = skillsExpanded
        ? category.skills.length
        : Math.max(0, VISIBLE_SKILL_COUNT - visibleCategories.skillCount);
      const visibleSkills = category.skills.slice(0, remainingCount);

      if (visibleSkills.length > 0) {
        visibleCategories.categories.push({
          ...category,
          skills: visibleSkills,
        });
        visibleCategories.skillCount += visibleSkills.length;
      }

      return visibleCategories;
    },
    { categories: [], skillCount: 0 },
  ).categories;

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
        {roles.map((role) => (
          <div
            className="experience__role"
            key={`${role.title}-${role.timeframe}`}
          >
            <h3 className="experience__role-title">{role.title}</h3>
            <span className="experience__role-timeframe">{role.timeframe}</span>
          </div>
        ))}
      </div>

      {description.map((paragraph, index) => (
        <p
          className={index === 0 ? "experience__description" : undefined}
          key={index}
        >
          {paragraph}
        </p>
      ))}

      {totalSkills > 0 && (
        <div className="experience__skills">
          {visibleSkillCategories.map((category) => (
            <section
              className="experience__skill-category"
              key={category.name}
              aria-label={category.name}
            >
              <h4 className="experience__skill-category-title">
                {category.name}
              </h4>
              <ul className="experience__skill-list">
                {category.skills.map((skill) => (
                  <li className="experience__skill" key={skill}>
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          ))}
          {totalSkills > VISIBLE_SKILL_COUNT && (
            <button
              className="experience__skills-toggle"
              type="button"
              aria-expanded={skillsExpanded}
              onClick={() => setSkillsExpanded((expanded) => !expanded)}
            >
              {skillsExpanded ? "Show less" : `Show all ${totalSkills} skills`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
