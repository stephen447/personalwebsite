import { act } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import DublinGlobe from './DublinGlobe';
import { createGlobe } from './createGlobe';

jest.mock('./createGlobe', () => ({ createGlobe: jest.fn() }));

describe('DublinGlobe', () => {
  beforeEach(() => jest.resetAllMocks());

  describe('renderer lifecycle and loading states', () => {
    test('connects controls and disposes the renderer when unmounted', async () => {
      const globe = { reset: jest.fn(), key: jest.fn(), dispose: jest.fn() };
      createGlobe.mockReturnValue(globe);
      const view = render(<DublinGlobe />);
      await waitFor(() => expect(createGlobe).toHaveBeenCalledTimes(1));
      act(() => createGlobe.mock.calls[0][2]());
      expect(screen.queryByText('Loading Earth…')).not.toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: /Dublin, Ireland/ }));
      fireEvent.keyDown(screen.getByRole('img'), { key: 'ArrowRight' });
      expect(globe.reset).toHaveBeenCalledTimes(1);
      expect(globe.key).toHaveBeenCalledWith('ArrowRight');
      view.unmount();
      expect(globe.dispose).toHaveBeenCalledTimes(1);
    });

    test('shows an unavailable message when WebGL is unavailable', async () => {
      createGlobe.mockImplementation(() => {
        throw new Error('WebGL unavailable');
      });
      render(<DublinGlobe />);
      expect(await screen.findByRole('status')).toBeInTheDocument();
    });

    test('keeps the loading indicator until the renderer reports ready', async () => {
      createGlobe.mockReturnValue({ dispose: jest.fn() });
      render(<DublinGlobe />);
      expect(screen.getByText('Loading Earth…')).toBeInTheDocument();
      await waitFor(() => expect(createGlobe).toHaveBeenCalledTimes(1));
      expect(screen.getByText('Loading Earth…')).toBeInTheDocument();
      act(() => createGlobe.mock.calls[0][2]());
      expect(screen.queryByText('Loading Earth…')).not.toBeInTheDocument();
      expect(
        screen.getByRole('img', { name: /Interactive 3D Earth/ }),
      ).toHaveAttribute('tabindex', '0');
    });

    test('shows a fallback on a renderer error and disposes resources on unmount', async () => {
      const dispose = jest.fn();
      createGlobe.mockReturnValue({ dispose });
      const view = render(<DublinGlobe />);
      await waitFor(() => expect(createGlobe).toHaveBeenCalledTimes(1));
      act(() => createGlobe.mock.calls[0][3]());
      expect(screen.getByRole('status')).toHaveTextContent(
        '3D globe unavailable.',
      );
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
      view.unmount();
      expect(dispose).toHaveBeenCalledTimes(1);
    });
  });

  describe('keyboard controls', () => {
    test('forwards supported keys while leaving unrelated keys alone', async () => {
      const key = jest.fn();
      createGlobe.mockReturnValue({ key, dispose: jest.fn() });
      render(<DublinGlobe />);
      await waitFor(() => expect(createGlobe).toHaveBeenCalledTimes(1));
      const canvas = screen.getByRole('img');
      for (const supported of [
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Home',
      ]) {
        expect(fireEvent.keyDown(canvas, { key: supported })).toBe(false);
        expect(key).toHaveBeenLastCalledWith(supported);
      }
      expect(fireEvent.keyDown(canvas, { key: 'Tab' })).toBe(true);
      expect(key).toHaveBeenCalledTimes(5);
    });
  });

  describe('asynchronous lifecycle safety', () => {
    test('does not start a renderer if unmounted before its module resolves', async () => {
      const view = render(<DublinGlobe />);
      view.unmount();
      await act(async () => {
        await Promise.resolve();
      });
      expect(createGlobe).not.toHaveBeenCalled();
    });

    test('ignores ready and failure notifications after unmount', async () => {
      const dispose = jest.fn();
      createGlobe.mockReturnValue({ dispose });
      const view = render(<DublinGlobe />);
      await waitFor(() => expect(createGlobe).toHaveBeenCalledTimes(1));
      const [, , ready, failed] = createGlobe.mock.calls[0];
      view.unmount();
      act(() => {
        ready();
        failed();
      });
      expect(dispose).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    test('controls can be used safely before the renderer is available', async () => {
      createGlobe.mockReturnValue({ dispose: jest.fn() });
      render(<DublinGlobe />);
      fireEvent.click(screen.getByRole('button'));
      fireEvent.keyDown(screen.getByRole('img'), { key: 'Home' });
      expect(screen.getByText('Loading Earth…')).toBeInTheDocument();
      await waitFor(() => expect(createGlobe).toHaveBeenCalledTimes(1));
    });
  });
});
