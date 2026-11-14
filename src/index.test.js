import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

jest.mock('react-dom/client', () => ({ createRoot: jest.fn() }));
jest.mock('./App', () => jest.fn());
jest.mock('./reportWebVitals', () => jest.fn());

describe('Application entry point', () => {
  test('mounts the application in StrictMode and initializes performance reporting', () => {
    const host = document.createElement('div');
    host.id = 'root';
    document.body.appendChild(host);
    const render = jest.fn();
    ReactDOM.createRoot.mockReturnValue({ render });
    require('./index');
    expect(ReactDOM.createRoot).toHaveBeenCalledWith(host);
    const element = render.mock.calls[0][0];
    expect(element.type).toBe(React.StrictMode);
    expect(element.props.children.type).toBe(App);
    expect(reportWebVitals).toHaveBeenCalledTimes(1);
    host.remove();
  });
});
