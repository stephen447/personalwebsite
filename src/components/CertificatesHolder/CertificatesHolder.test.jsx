import { render, screen, within } from '@testing-library/react';
import CertificatesHolder from './CertificatesHolder';

describe('CertificatesHolder', () => {
  test('renders the named section and all certificates in their existing order', () => {
    render(<CertificatesHolder />);
    const section = screen.getByRole('region', { name: 'Certificates' });
    expect(section).toHaveAttribute('id', 'certificates');
    expect(
      within(section).getByRole('heading', { name: 'Certificates', level: 2 }),
    ).toBeInTheDocument();
    const cards = within(section).getAllByRole('listitem');
    const names = [
      'Certified System Administrator',
      'Unsupervised Learning, Recommenders, Reinforcement Learning',
      'Advanced Learning Algorithms',
      'Machine Learning',
      'Supervised Machine Learning: Regression and Classification',
    ];
    expect(cards).toHaveLength(names.length);
    names.forEach((name, index) =>
      expect(cards[index]).toHaveTextContent(name),
    );
    expect(within(cards[0]).getByText(/July 2025/)).toHaveAttribute(
      'datetime',
      '2025-07',
    );
  });

  test('preserves verification destinations without inventing download links', () => {
    render(<CertificatesHolder />);
    const links = screen.getAllByRole('link');
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      'https://coursera.org/verify/0TJ26WPKCQ78',
      'https://www.coursera.org/account/accomplishments/verify/P0KG0DZG15NA',
      'https://www.coursera.org/account/accomplishments/specialization/02DYR23OXCJS',
    ]);
    expect(
      screen.queryByRole('link', { name: 'Download certificate' }),
    ).not.toBeInTheDocument();
  });
});
