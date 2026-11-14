import { render, screen } from '@testing-library/react';
import Award from './Award';

describe('Award', () => {
  test('renders awards with and without a date', () => {
    const view = render(
      <ul>
        <Award name="Engineering award" issuer="Example" date="2026" />
      </ul>,
    );
    expect(screen.getByRole('listitem')).toHaveTextContent(
      'Engineering awardExample · 2026',
    );
    view.rerender(
      <ul>
        <Award name="Engineering award" issuer="Example" />
      </ul>,
    );
    expect(screen.getByRole('listitem')).toHaveTextContent(
      'Engineering awardExample',
    );
    expect(screen.queryByText(/2026/)).not.toBeInTheDocument();
  });
});
