import './Award.css';

/**
 * Display an award with its issuer and optional date.
 * @param {{ name: string, issuer: string, date?: string }} props Award details.
 * @returns {import('react').ReactElement} Award list item.
 */
export default function Award({ name, issuer, date }) {
  return (
    <li className="award">
      <span className="award__name">{name}</span>
      <p className="award__issuer">
        {issuer}
        {date && (
          <>
            <span aria-hidden="true"> · </span>
            {date}
          </>
        )}
      </p>
    </li>
  );
}
