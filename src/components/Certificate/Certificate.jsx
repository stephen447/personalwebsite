import './Certificate.css';

/**
 * Display a certificate with optional verification and download links.
 * @param {{ name: string, provider: string, date?: string, dateTime?: string, url?: string, downloadUrl?: string }} props Certificate details.
 * @returns {import('react').ReactElement} Certificate list item.
 */
export default function Certificate({
  name,
  provider,
  date,
  dateTime,
  url,
  downloadUrl,
}) {
  return (
    <li className="certificate">
      <div className="certificate__name">
        {url ? (
          <a
            className="certificate__link"
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
      <p className="certificate__issuer">
        {provider}
        {date && (
          <>
            <span aria-hidden="true"> · </span>
            <time dateTime={dateTime}>{date}</time>
          </>
        )}
      </p>
      {downloadUrl && (
        <a className="certificate__download" href={downloadUrl} download>
          Download certificate
        </a>
      )}
    </li>
  );
}
