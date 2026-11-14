import { fireEvent, render, screen, within } from '@testing-library/react';
import Experience from './Experience';

const baseProps = {
  company: 'Example Company',
  url: 'https://example.com',
  roles: [{ title: 'Engineer', timeframe: '2024–2026' }],
};
const skillCategories = [
  { name: 'Frontend', skills: ['React', 'CSS', 'HTML', 'JavaScript'] },
  { name: 'Backend', skills: ['Node', 'SQL', 'Python', 'Docker'] },
];

describe('Experience', () => {
  test('allows an experience with no roles and skips empty skill categories', () => {
    render(
      <Experience
        company="Example"
        url="https://example.com"
        skillCategories={[{ name: 'Empty', skills: [] }]}
      />,
    );
    expect(screen.getByRole('link', { name: 'Example' })).toBeInTheDocument();
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
  });

  test('expands and collapses the description with accessible state', () => {
    render(
      <Experience {...baseProps} description={['Summary', 'More detail']} />,
    );
    expect(screen.getByText('Summary')).toBeInTheDocument();
    expect(screen.queryByText('More detail')).not.toBeInTheDocument();
    const toggle = screen.getByRole('button', { name: 'Read more' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle.getAttribute('aria-controls')).toBeTruthy();
    fireEvent.click(toggle);
    expect(screen.getByText('More detail')).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Show less' }));
    expect(screen.queryByText('More detail')).not.toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('limits skills across categories and restores that limit after collapsing', () => {
    render(<Experience {...baseProps} skillCategories={skillCategories} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(6);
    expect(
      within(screen.getByRole('region', { name: 'Backend' })).getAllByRole(
        'listitem',
      ),
    ).toHaveLength(2);
    expect(screen.queryByText('Python')).not.toBeInTheDocument();
    const toggle = screen.getByRole('button', { name: 'Show all 8 skills' });
    fireEvent.click(toggle);
    expect(screen.getAllByRole('listitem')).toHaveLength(8);
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Show less' }));
    expect(screen.getAllByRole('listitem')).toHaveLength(6);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('description and skill expansion operate independently', () => {
    render(
      <Experience
        {...baseProps}
        description={['Summary', 'More detail']}
        skillCategories={skillCategories}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Read more' }));
    expect(screen.getAllByRole('listitem')).toHaveLength(6);
    fireEvent.click(screen.getByRole('button', { name: 'Show all 8 skills' }));
    expect(screen.getByText('More detail')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(8);
  });

  test('omits expansion controls when optional content is absent', () => {
    render(<Experience {...baseProps} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Engineer' }),
    ).toBeInTheDocument();
    expect(screen.getByText('2024–2026')).toBeInTheDocument();
  });

  test('shows exactly six skills without an unnecessary expansion control', () => {
    render(
      <Experience
        {...baseProps}
        skillCategories={[
          { name: 'Skills', skills: ['A', 'B', 'C', 'D', 'E', 'F'] },
        ]}
      />,
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(6);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('keeps expansion state independent between experience cards', () => {
    render(
      <>
        <Experience
          {...baseProps}
          description={['First summary', 'First detail']}
        />
        <Experience
          {...baseProps}
          company="Second Company"
          description={['Second summary', 'Second detail']}
        />
      </>,
    );
    fireEvent.click(screen.getAllByRole('button', { name: 'Read more' })[0]);
    expect(screen.getByText('First detail')).toBeInTheDocument();
    expect(screen.queryByText('Second detail')).not.toBeInTheDocument();
  });
});
