import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import DublinGlobe from './DublinGlobe';
import { createGlobe } from './createGlobe';

jest.mock('./createGlobe', () => ({ createGlobe: jest.fn() }));

beforeEach(() => jest.clearAllMocks());

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
  createGlobe.mockImplementation(() => { throw new Error('WebGL unavailable'); });
  render(<DublinGlobe />);
  expect(await screen.findByRole('status')).toBeInTheDocument();
});
