import { act, render, screen } from '@testing-library/react';
import WelcomeOverlay from './components/WelcomeOverlay/WelcomeOverlay';

const renderWelcome = () => render(<WelcomeOverlay><a href="#projects">Homepage control</a></WelcomeOverlay>);
beforeEach(() => {
  jest.useFakeTimers();
  sessionStorage.clear();
  window.history.replaceState(null, '', '/');
  window.matchMedia = jest.fn(() => ({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
});
afterEach(() => { jest.useRealTimers(); });

test('runs the greetings, holds Irish until 2.1s and removes the overlay at 2.8s', () => {
  const { container } = renderWelcome();
  expect(screen.getByText('Hello')).toBeInTheDocument();
  for (const [ms, greeting] of [[400, 'Bonjour'], [275, 'Hola'], [275, 'Ciao'], [275, 'Hallo'], [275, 'Dia duit']]) {
    act(() => jest.advanceTimersByTime(ms));
    expect(screen.getByText(greeting)).toBeInTheDocument();
  }
  expect(screen.queryByText('Hello, in Irish')).not.toBeInTheDocument();
  act(() => jest.advanceTimersByTime(600));
  expect(container.querySelector('.welcome-overlay--exit')).toBeInTheDocument();
  act(() => jest.advanceTimersByTime(700));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(screen.getByRole('link')).toBeInTheDocument();
});

test('a remount skips the intro even when the first playback was interrupted', () => {
  const view = renderWelcome();
  view.unmount();
  renderWelcome();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test.each(['/projects/example', '/#project__container'])('direct link %s skips the welcome', url => {
  window.history.replaceState(null, '', url);
  renderWelcome();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('reduced motion skips the intro', () => {
  window.matchMedia.mockReturnValue({ matches: true });
  renderWelcome();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
