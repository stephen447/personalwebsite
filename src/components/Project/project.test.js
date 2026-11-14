import { render, screen, within } from '@testing-library/react';
import Project from './project';

const project = {
  title: 'Example project',
  year: '2026',
  description: 'A useful application',
  techStack: ['React', 'CSS'],
};

describe('Project', () => {
  test('renders a linked project with its content and a safe external destination', () => {
    render(<Project {...project} url="https://example.com/project" />);
    const link = screen.getByRole('link', { name: /Example project/ });
    expect(link).toHaveAttribute('href', 'https://example.com/project');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(
      within(link).getByRole('heading', { name: project.title }),
    ).toBeInTheDocument();
    expect(within(link).getByText(project.description)).toBeInTheDocument();
    expect(within(link).getByText('React')).toBeInTheDocument();
    expect(within(link).getByText('CSS')).toBeInTheDocument();
  });

  test('renders projects without a URL as content rather than a broken link', () => {
    render(<Project {...project} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: project.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(project.year)).toBeInTheDocument();
  });

  test('supports a project without technology metadata', () => {
    render(<Project title="Minimal project" />);
    expect(
      screen.getByRole('heading', { name: 'Minimal project' }),
    ).toBeInTheDocument();
    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });
});
