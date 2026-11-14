import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./pages/HomePage/HomePage', () => () => <h1>Stephen Byrne</h1>);

const originalMatchMedia = window.matchMedia;

describe('App', () => {
  beforeEach(() => {
    window.matchMedia = jest.fn(() => ({ matches: true }));
  });
  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });
  describe('pointer effects', () => {
    test('moves the decorative glow with the pointer', () => {
      const { container } = render(<App />);
      fireEvent.mouseMove(
        screen.getByRole('heading', { name: 'Stephen Byrne' }),
        {
          clientX: 300,
          clientY: 400,
        },
      );
      // The decorative glow intentionally has no accessible role or name.
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      expect(container.querySelector('.glow')).toHaveStyle({
        left: '175px',
        top: '275px',
      });
    });
  });
});
