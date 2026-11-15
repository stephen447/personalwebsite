import './AwardsHolder.css';
import Award from '../Award/Award';

const awards = [
  {
    name: 'ServiceNow Llama Award',
    issuer: 'ServiceNow',
    date: 'Q2 2026',
  },
];

/** Render the independent awards section and its existing cards. */
export default function AwardsHolder() {
  return (
    <section
      aria-labelledby="awards-title"
      className="awards-holder"
      id="awards"
    >
      <h2 className="awards-holder__title" id="awards-title">
        Awards
      </h2>
      <ul className="awards-holder__list">
        {awards.map(
          /** Render a card using its stable name as the key. */
          (item) => (
            <Award key={item.name} {...item} />
          ),
        )}
      </ul>
    </section>
  );
}
