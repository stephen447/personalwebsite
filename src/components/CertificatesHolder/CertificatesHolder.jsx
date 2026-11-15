import './CertificatesHolder.css';
import Certificate from '../Certificate/Certificate';

const certificates = [
  {
    name: 'Certified System Administrator',
    provider: 'ServiceNow',
    date: 'July 2025',
    dateTime: '2025-07',
    url: null,
    downloadUrl: null,
  },
  {
    name: 'Unsupervised Learning, Recommenders, Reinforcement Learning',
    provider: 'Coursera',
    date: 'Nov 2025',
    dateTime: '2025-11',
    url: 'https://coursera.org/verify/0TJ26WPKCQ78',
    downloadUrl: null,
  },
  {
    name: 'Advanced Learning Algorithms',
    provider: 'Coursera',
    date: 'Oct 2025',
    dateTime: '2025-10',
    url: 'https://www.coursera.org/account/accomplishments/verify/P0KG0DZG15NA',
    downloadUrl: null,
  },
  {
    name: 'Machine Learning',
    provider: 'Coursera',
    date: 'Nov 2025',
    dateTime: '2025-11',
    url: 'https://www.coursera.org/account/accomplishments/specialization/02DYR23OXCJS',
    downloadUrl: null,
  },
  {
    name: 'Supervised Machine Learning: Regression and Classification',
    provider: 'Coursera',
    date: 'Oct 2025',
    dateTime: '2025-10',
    url: null,
    downloadUrl: null,
  },
];

/** Render the independent certificates section and its existing cards. */
export default function CertificatesHolder() {
  return (
    <section
      aria-labelledby="certificates-title"
      className="certificates-holder"
      id="certificates"
    >
      <h2 className="certificates-holder__title" id="certificates-title">
        Certificates
      </h2>
      <ul className="certificates-holder__list">
        {certificates.map(
          /** Render a card using its stable name as the key. */
          (item) => (
            <Certificate key={item.name} {...item} />
          ),
        )}
      </ul>
    </section>
  );
}
