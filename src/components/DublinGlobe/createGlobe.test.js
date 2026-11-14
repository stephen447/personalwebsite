import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createGlobe } from './createGlobe';

// Keep Three's real geometry and camera maths; replace only browser/GPU boundaries.
jest.mock('three', () => ({
  ...jest.requireActual('three'),
  WebGLRenderer: jest.fn(),
  TextureLoader: jest.fn(),
}));
jest.mock(
  'three/addons/controls/OrbitControls.js',
  () => ({ OrbitControls: jest.fn() }),
  { virtual: true },
);

let renderer, orbit, observer, resize, change, loaded, failed, texture;
let canvas, label, ready, error;
const originalObserver = global.ResizeObserver;
const originalRatio = window.devicePixelRatio;

describe('createGlobe', () => {
  beforeEach(() => {
    renderer = {
      setPixelRatio: jest.fn(),
      setClearColor: jest.fn(),
      setSize: jest.fn(),
      render: jest.fn(),
      dispose: jest.fn(),
      capabilities: { getMaxAnisotropy: jest.fn(() => 16) },
    };
    orbit = {
      update: jest.fn(),
      saveState: jest.fn(),
      reset: jest.fn(),
      dispose: jest.fn(),
      addEventListener: jest.fn((event, callback) => {
        change = callback;
      }),
    };
    observer = { observe: jest.fn(), disconnect: jest.fn() };
    global.ResizeObserver = jest.fn((callback) => {
      resize = callback;
      return observer;
    });
    THREE.WebGLRenderer.mockImplementation(() => renderer);
    OrbitControls.mockImplementation(() => orbit);
    texture = new THREE.Texture();
    jest.spyOn(texture, 'dispose');
    THREE.TextureLoader.mockImplementation(() => ({
      load: jest.fn((url, onLoad, progress, onError) => {
        loaded = onLoad;
        failed = onError;
        return texture;
      }),
    }));
    canvas = document.createElement('canvas');
    label = document.createElement('span');
    ready = jest.fn();
    error = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    global.ResizeObserver = originalObserver;
    Object.defineProperty(window, 'devicePixelRatio', {
      configurable: true,
      value: originalRatio,
    });
  });

  describe('rendering and camera controls', () => {
    test('loads a textured globe, positions its label and resizes to the canvas', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        configurable: true,
        value: 3,
      });
      const controls = createGlobe(canvas, label, ready, error);
      expect(renderer.setPixelRatio).toHaveBeenCalledWith(2);
      expect(renderer.setSize).toHaveBeenCalledWith(250, 250, false);
      expect(label.hidden).toBe(true);
      loaded(texture);
      expect(ready).toHaveBeenCalledTimes(1);
      expect(texture.colorSpace).toBe(THREE.SRGBColorSpace);
      expect(texture.anisotropy).toBe(8);
      expect(label.hidden).toBe(false);
      expect(label.style.left).toMatch(/%$/);
      const [scene, camera] = renderer.render.mock.calls[0];
      expect(
        scene.children.some((child) => child.material?.map === texture),
      ).toBe(true);
      camera.position.multiplyScalar(-1);
      change();
      expect(label.hidden).toBe(true);
      Object.defineProperty(canvas, 'clientWidth', { value: 320 });
      resize();
      expect(renderer.setSize).toHaveBeenLastCalledWith(320, 320, false);
      controls.dispose();
    });

    test('supports every keyboard direction, clamps poles, ignores other keys and resets', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        configurable: true,
        value: 0,
      });
      const controls = createGlobe(canvas, label, ready, error);
      expect(renderer.setPixelRatio).toHaveBeenCalledWith(1);
      const camera = renderer.render.mock.calls[0][1];
      for (const [key, theta, phi] of [
        ['ArrowLeft', 0.15, 0],
        ['ArrowRight', -0.15, 0],
        ['ArrowUp', 0, -0.15],
        ['ArrowDown', 0, 0.15],
      ]) {
        const before = new THREE.Spherical().setFromVector3(camera.position);
        controls.key(key);
        const after = new THREE.Spherical().setFromVector3(camera.position);
        expect(after.theta).toBeCloseTo(before.theta + theta);
        expect(after.phi).toBeCloseTo(before.phi + phi);
        expect(after.radius).toBeCloseTo(before.radius);
      }
      for (let index = 0; index < 30; index++) controls.key('ArrowUp');
      expect(
        new THREE.Spherical().setFromVector3(camera.position).phi,
      ).toBeCloseTo(0.1);
      for (let index = 0; index < 30; index++) controls.key('ArrowDown');
      expect(
        new THREE.Spherical().setFromVector3(camera.position).phi,
      ).toBeCloseTo(Math.PI - 0.1);
      orbit.update.mockClear();
      controls.key('Tab');
      expect(orbit.update).not.toHaveBeenCalled();
      controls.key('Home');
      controls.reset();
      expect(orbit.reset).toHaveBeenCalledTimes(2);
      controls.dispose();
    });
  });

  describe('resource cleanup and failures', () => {
    test('disposes all GPU resources once and ignores late load/error/render callbacks', () => {
      const controls = createGlobe(canvas, label, ready, error);
      const scene = renderer.render.mock.calls[0][0];
      const resources = new Set();
      scene.traverse((object) => {
        if (object.geometry) resources.add(object.geometry);
        if (object.material) resources.add(object.material);
      });
      const disposals = [...resources].map((resource) =>
        jest.spyOn(resource, 'dispose'),
      );
      controls.dispose();
      controls.dispose();
      expect(observer.disconnect).toHaveBeenCalledTimes(1);
      expect(orbit.dispose).toHaveBeenCalledTimes(1);
      expect(texture.dispose).toHaveBeenCalledTimes(1);
      expect(renderer.dispose).toHaveBeenCalledTimes(1);
      disposals.forEach((dispose) => expect(dispose).toHaveBeenCalledTimes(1));
      renderer.render.mockClear();
      change();
      expect(renderer.render).not.toHaveBeenCalled();
      const lateTexture = new THREE.Texture();
      const lateDispose = jest.spyOn(lateTexture, 'dispose');
      loaded(lateTexture);
      failed();
      canvas.dispatchEvent(new Event('webglcontextlost', { cancelable: true }));
      expect(lateDispose).toHaveBeenCalledTimes(1);
      expect(ready).not.toHaveBeenCalled();
      expect(error).not.toHaveBeenCalled();
    });

    test('cleans up and reports texture failures only once', () => {
      createGlobe(canvas, label, ready, error);
      failed();
      failed();
      expect(error).toHaveBeenCalledTimes(1);
      expect(renderer.dispose).toHaveBeenCalledTimes(1);
      expect(ready).not.toHaveBeenCalled();
    });

    test('prevents context-loss default handling and releases resources', () => {
      createGlobe(canvas, label, ready, error);
      const event = new Event('webglcontextlost', { cancelable: true });
      canvas.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(true);
      expect(error).toHaveBeenCalledTimes(1);
      expect(renderer.dispose).toHaveBeenCalledTimes(1);
    });

    test('propagates WebGL initialization failure to the caller', () => {
      THREE.WebGLRenderer.mockImplementation(() => {
        throw new Error('WebGL unavailable');
      });
      expect(() => createGlobe(canvas, label, ready, error)).toThrow(
        'WebGL unavailable',
      );
      expect(ready).not.toHaveBeenCalled();
    });
  });
});
