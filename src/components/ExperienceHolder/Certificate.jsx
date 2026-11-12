export default function Certificate({
  name,
  provider,
  date,
  dateTime,
  url,
  downloadUrl,
}) {
  return (
    <li className="experienceholder__recognition-item">
      <div className="experienceholder__recognition-name">
        {url ? (
          <a
            className="experienceholder__certificate-link"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {name}
          </a>
        ) : (
          name
        )}
      </div>
      <p className="experienceholder__recognition-issuer">
        {provider}
        {date && (
          <>
            <span aria-hidden="true"> · </span>
            <time dateTime={dateTime}>{date}</time>
          </>
        )}
      </p>
      {downloadUrl && (
        <a
          className="experienceholder__certificate-download"
          href={downloadUrl}
          download
        >
          Download certificate
        </a>
      )}
    </li>
  );
}
