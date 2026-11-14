import { fireEvent, render, screen } from '@testing-library/react';
import NavBar from './navBar';

describe('NavBar navigation', () => {
  afterEach(() => jest.restoreAllMocks());

  test.each([
    ['About Me', 'about-me'],
    ['Experience', 'experience__container'],
    ['Projects', 'project__container'],
  ])('navigates %s to the matching page section', (name, id) => {
    const scrollIntoView = jest.fn();
    render(
      <>
        <NavBar />
        <section id={id} aria-label="Destination" />
      </>,
    );
    const section = screen.getByRole('region', { name: 'Destination' });
    section.scrollIntoView = scrollIntoView;
    const link = screen.getByRole('link', { name });
    expect(link).toHaveAttribute('href', `#${id}`);
    fireEvent.click(link);
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});
