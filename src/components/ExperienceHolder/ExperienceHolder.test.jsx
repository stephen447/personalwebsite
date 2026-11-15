import { render, screen } from '@testing-library/react';
import ExperienceHolder from './ExperienceHolder';

describe('ExperienceHolder', () => {
  test('contains employment history without certificates or awards', () => {
    render(<ExperienceHolder />);
    expect(
      screen.getByRole('heading', { name: 'Experience' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'ServiceNow' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Imagine Robotify' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Certificates' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Awards' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Certified System Administrator'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('ServiceNow Llama Award'),
    ).not.toBeInTheDocument();
  });
});
