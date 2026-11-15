import { render, screen, within } from '@testing-library/react';
import AwardsHolder from './AwardsHolder';

describe('AwardsHolder', () => {
  test('renders the independent awards section with its original award details', () => {
    render(<AwardsHolder />);
    const section = screen.getByRole('region', { name: 'Awards' });
    expect(section).toHaveAttribute('id', 'awards');
    expect(
      within(section).getByRole('heading', { name: 'Awards', level: 2 }),
    ).toBeInTheDocument();
    expect(within(section).getAllByRole('listitem')).toHaveLength(1);
    expect(within(section).getByRole('listitem')).toHaveTextContent(
      'ServiceNow Llama Award',
    );
    expect(within(section).getByRole('listitem')).toHaveTextContent(
      'ServiceNow · Q2 2026',
    );
  });
});
