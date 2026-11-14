import { act } from 'react';
import { render, screen } from '@testing-library/react';
import WelcomeOverlay from './WelcomeOverlay';

/** Render the intro with a focusable homepage control. */
const renderWelcome = () =>
  render(
    <WelcomeOverlay>
      <a href="#projects">Homepage control</a>
    </WelcomeOverlay>,
  );
describe('WelcomeOverlay', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    sessionStorage.clear();
    window.history.replaceState(null, '', '/');
    window.matchMedia = jest.fn(() => ({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
  });
  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  describe('greeting sequence', () => {
    test('runs the greetings, holds Irish until 2.1s and removes the overlay at 2.8s', () => {
      renderWelcome();
      expect(screen.getByText('Hello')).toBeInTheDocument();
      for (const [ms, greeting] of [
        [400, 'Bonjour'],
        [275, 'Hola'],
        [275, 'Ciao'],
        [275, 'Hallo'],
        [275, 'Dia duit'],
      ]) {
        act(() => jest.advanceTimersByTime(ms));
        expect(screen.getByText(greeting)).toBeInTheDocument();
      }
      expect(screen.queryByText('Hello, in Irish')).not.toBeInTheDocument();
      act(() => jest.advanceTimersByTime(600));
      expect(screen.getByRole('dialog')).toHaveClass('welcome-overlay--exit');
      act(() => jest.advanceTimersByTime(700));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(screen.getByRole('link')).toBeInTheDocument();
    });
  });

  describe('repeat visits and skipped introductions', () => {
    test('a remount skips the intro even when the first playback was interrupted', () => {
      const view = renderWelcome();
      view.unmount();
      renderWelcome();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test.each(['/projects/example', '/#project__container'])(
      'direct link %s skips the welcome',
      (url) => {
        window.history.replaceState(null, '', url);
        renderWelcome();
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      },
    );

    test('reduced motion skips the intro', () => {
      window.matchMedia.mockReturnValue({ matches: true });
      renderWelcome();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('accessibility and cleanup', () => {
    test('hides page controls from assistive technology until the intro finishes', () => {
      renderWelcome();
      expect(
        screen.getByRole('dialog', {
          name: 'Welcome to Stephen Byrne’s website',
        }),
      ).toBeInTheDocument();
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
      expect(screen.getByRole('link', { hidden: true })).toBeInTheDocument();
      act(() => jest.advanceTimersByTime(2100));
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
      act(() => jest.advanceTimersByTime(700));
      expect(
        screen.getByRole('link', { name: 'Homepage control' }),
      ).toBeInTheDocument();
    });

    test.each([0, 2100])(
      'cleans up pending timers when unmounted at %i milliseconds',
      (elapsed) => {
        const view = renderWelcome();
        act(() => jest.advanceTimersByTime(elapsed));
        expect(jest.getTimerCount()).toBeGreaterThan(0);
        view.unmount();
        expect(jest.getTimerCount()).toBe(0);
      },
    );
  });

  describe('navigation and storage failures', () => {
    test('does not consume the welcome on a deep link', () => {
      window.history.replaceState(null, '', '/#projects');
      const view = renderWelcome();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      view.unmount();
      window.history.replaceState(null, '', '/');
      renderWelcome();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    test('continues the welcome when writing session storage is blocked', () => {
      jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('Storage unavailable');
      });
      const view = renderWelcome();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      act(() => jest.advanceTimersByTime(2100));
      act(() => jest.advanceTimersByTime(700));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      view.unmount();
      jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('Storage unavailable');
      });
      renderWelcome();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
