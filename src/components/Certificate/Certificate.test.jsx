import { render, screen } from '@testing-library/react';
import Certificate from './Certificate';

describe('Certificate', () => {
  test('renders verification and download links when available', () => {
    render(
      <ul>
        <Certificate
          name="Certificate"
          provider="Example"
          date="June 2026"
          dateTime="2026-06"
          url="https://example.com/verify"
          downloadUrl="/certificate.pdf"
        />
      </ul>,
    );
    expect(screen.getByRole('link', { name: 'Certificate' })).toHaveAttribute(
      'href',
      'https://example.com/verify',
    );
    expect(screen.getByRole('link', { name: 'Certificate' })).toHaveAttribute(
      'rel',
      'noopener noreferrer',
    );
    expect(
      screen.getByRole('link', { name: 'Download certificate' }),
    ).toHaveAttribute('download');
    expect(
      screen.getByRole('link', { name: 'Download certificate' }),
    ).toHaveAttribute('href', '/certificate.pdf');
    expect(screen.getByText('June 2026')).toHaveAttribute(
      'datetime',
      '2026-06',
    );
  });

  test('renders plain certificate details without optional metadata', () => {
    render(
      <ul>
        <Certificate name="Certificate" provider="Example" />
      </ul>,
    );
    expect(screen.getByRole('listitem')).toHaveTextContent(
      'CertificateExample',
    );
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
