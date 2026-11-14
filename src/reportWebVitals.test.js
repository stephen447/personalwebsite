import reportWebVitals from './reportWebVitals';
import * as metrics from 'web-vitals';

jest.mock('web-vitals', () => ({
  __esModule: true,
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn(),
}));
describe('reportWebVitals', () => {
  beforeEach(() => jest.clearAllMocks());

  test('registers the supplied callback with every performance metric', async () => {
    /** Receive the metric reported by the browser measurement library. */
    const callback = () => {};
    reportWebVitals(callback);
    await import('web-vitals');
    ['getCLS', 'getFID', 'getFCP', 'getLCP', 'getTTFB'].forEach((name) =>
      expect(metrics[name]).toHaveBeenCalledWith(callback),
    );
  });

  test.each([undefined, null, 'not a function'])(
    'ignores invalid callback %s',
    async (callback) => {
      reportWebVitals(callback);
      await Promise.resolve();
      ['getCLS', 'getFID', 'getFCP', 'getLCP', 'getTTFB'].forEach((name) =>
        expect(metrics[name]).not.toHaveBeenCalled(),
      );
    },
  );
});
