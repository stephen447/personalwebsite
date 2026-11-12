export default function Award({ name, issuer, date }) {
  return (
    <li className="experienceholder__recognition-item">
      <span className="experienceholder__recognition-name">{name}</span>
      <p className="experienceholder__recognition-issuer">
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
