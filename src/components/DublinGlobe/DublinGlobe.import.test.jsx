import { act } from 'react';
import { render, screen } from '@testing-library/react';
import DublinGlobe from './DublinGlobe';

jest.mock('./createGlobe', () => {
  throw new Error('Renderer chunk unavailable');
});

describe('DublinGlobe module loading', () => {
  test('shows the fallback when the renderer module fails to load', async () => {
    render(<DublinGlobe />);
    expect(await screen.findByRole('status')).toHaveTextContent(
      '3D globe unavailable.',
    );
  });

  test('ignores a module load failure after unmount', async () => {
    const view = render(<DublinGlobe />);
    view.unmount();
    await act(async () => {
      await Promise.resolve();
    });
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
