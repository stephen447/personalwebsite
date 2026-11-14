import { act } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import HomePage from './HomePage';

jest.mock('../../components/DublinGlobe/DublinGlobe', () => () => (
  <span>Globe placeholder</span>
));

const originalWidth = window.innerWidth;
const originalShowModal = HTMLDialogElement.prototype.showModal;
const originalClose = HTMLDialogElement.prototype.close;

describe('HomePage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-01-15T12:00:59Z'));
    window.innerWidth = 1200;
    // jsdom has no native dialog implementation; model only the open/close boundary.
    HTMLDialogElement.prototype.showModal = jest.fn(function () {
      this.setAttribute('open', '');
    });
    HTMLDialogElement.prototype.close = jest.fn(function () {
      this.removeAttribute('open');
    });
  });
  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
    window.innerWidth = originalWidth;
    HTMLDialogElement.prototype.showModal = originalShowModal;
    HTMLDialogElement.prototype.close = originalClose;
  });

  describe('portfolio content', () => {
    test('renders the portfolio sections and working contact destinations', () => {
      render(<HomePage />);
      for (const name of [
        'Stephen Byrne',
        "Dia Duit, I'm Stephen",
        'Experience',
        'Projects',
        'Certificates',
        'Awards',
      ]) {
        expect(screen.getByRole('heading', { name })).toBeInTheDocument();
      }
      expect(screen.getByText('ServiceNow Llama Award')).toBeInTheDocument();
      expect(
        screen.getAllByRole('img', { name: 'ServiceNow logo' }),
      ).toHaveLength(2);
      expect(
        screen.getByRole('img', { name: 'Imagine Robotify logo' }),
      ).toBeInTheDocument();
      const destinations = screen
        .getAllByRole('link')
        .map((link) => link.getAttribute('href'));
      expect(destinations).toEqual(
        expect.arrayContaining([
          'mailto:sdavidbyrne@gmail.com',
          'https://github.com/stephen447',
          '/StephenByrneCV.pdf',
        ]),
      );
      expect(
        screen.getByRole('link', { name: /Car Advertising App/ }),
      ).toHaveAttribute('href', 'https://car-advertising-app-1.onrender.com');
    });
  });

  describe('portrait dialog', () => {
    test('opens the portrait, keeps it open on image clicks and closes with either control', () => {
      render(<HomePage />);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      fireEvent.click(
        screen.getByRole('button', { name: 'Enlarge photo of Stephen Byrne' }),
      );
      const dialog = screen.getByRole('dialog', {
        name: 'Photo of Stephen Byrne',
      });
      fireEvent.click(
        screen.getByRole('img', { name: 'Stephen Byrne on a skiing holiday' }),
      );
      expect(dialog).toHaveAttribute('open');
      fireEvent.click(screen.getByRole('button', { name: 'Close photo' }));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      fireEvent.click(
        screen.getByRole('button', { name: 'Enlarge photo of Stephen Byrne' }),
      );
      fireEvent.click(screen.getByRole('dialog'));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('clock and viewport lifecycle', () => {
    test('updates Dublin time and clears its timer on unmount', () => {
      const view = render(<HomePage />);
      expect(
        screen.getByLabelText('Local time in Dublin: 12:00'),
      ).toHaveAttribute('datetime', '2026-01-15T12:00:59.000Z');
      act(() => jest.advanceTimersByTime(1000));
      expect(
        screen.getByLabelText('Local time in Dublin: 12:01'),
      ).toHaveTextContent('12:01 local time');
      view.unmount();
      expect(jest.getTimerCount()).toBe(0);
    });

    test('shows the mobile scroll cue after resizing and removes the resize listener on unmount', () => {
      const add = jest.spyOn(window, 'addEventListener');
      const remove = jest.spyOn(window, 'removeEventListener');
      const view = render(<HomePage />);
      expect(screen.queryByText('Scroll Down')).not.toBeInTheDocument();
      window.innerWidth = 600;
      fireEvent.resize(window);
      expect(screen.getByText('Scroll Down')).toBeInTheDocument();
      window.innerWidth = 1200;
      fireEvent.resize(window);
      expect(screen.queryByText('Scroll Down')).not.toBeInTheDocument();
      const listener = add.mock.calls.find(([type]) => type === 'resize')[1];
      view.unmount();
      expect(remove).toHaveBeenCalledWith('resize', listener);
    });
  });
});
