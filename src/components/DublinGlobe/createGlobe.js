import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import earthImage from "./earth.jpg";
const DUBLIN = [-6.2603, 53.3498];
const HOME_VIEW = { longitude: -18, latitude: 35 };

/**
 * Convert geographic coordinates to a point on the globe, matching the Earth
 * texture's orientation: +Y is north, +X is 0° longitude, and −Z is 90° east.
 * @param {number} longitude Longitude in degrees, positive east of Greenwich.
 * @param {number} latitude Latitude in degrees, positive north of the equator.
 * @param {number} [radius=1] Distance from the globe's centre in scene units.
 * @returns {THREE.Vector3} Position in the globe's coordinate system.
 */
function positionAt(longitude, latitude, radius = 1) {
  const lat = THREE.MathUtils.degToRad(latitude);
  const lon = THREE.MathUtils.degToRad(longitude);
  return new THREE.Vector3(
    radius * Math.cos(lat) * Math.cos(lon),
    radius * Math.sin(lat),
    -radius * Math.cos(lat) * Math.sin(lon),
  );
}

/**
 * @typedef {Object} GlobeControls
 * @property {function(): void} reset Restore the initial camera view of Dublin.
 * @property {function(string): void} key Handle arrow keys or Home; ignore other keys.
 * @property {function(): void} dispose Release GPU resources, controls, and observers.
 */

/**
 * Create a textured Three.js Earth with drag rotation and a labelled Dublin marker.
 * Renders on interaction, resize, and texture load; zoom and panning are disabled.
 * The caller must dispose the instance when its canvas is removed.
 * @param {HTMLCanvasElement} canvas Canvas used for WebGL rendering and pointer input.
 * @param {HTMLElement} label Positioned HTML label whose location and visibility are updated.
 * @param {function(): void} onReady Called after the Earth texture loads and is rendered.
 * @param {function(): void} onError Called after cleanup on texture failure or WebGL context loss.
 * @returns {GlobeControls} Camera controls and an idempotent cleanup function.
 * @throws {Error} If WebGL renderer creation or synchronous scene setup fails.
 */
export function createGlobe(canvas, label, onReady, onError) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 20);
  camera.position.copy(
    positionAt(HOME_VIEW.longitude, HOME_VIEW.latitude, 3.4),
  );
  scene.add(camera);

  // Camera-relative sunlight keeps the visible hemisphere well lit while exploring.
  const sunlight = new THREE.DirectionalLight(0xfff5e3, 2.5);
  sunlight.position.set(-3, 4, 5);
  camera.add(sunlight);
  scene.add(new THREE.AmbientLight(0xb6cfff, 1.2));

  const sphere = new THREE.SphereGeometry(1, 64, 48);
  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    shininess: 8,
    specular: 0x152738,
  });
  const earth = new THREE.Mesh(sphere, material);
  scene.add(earth);

  const atmosphereMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vView = normalize(-viewPosition.xyz);
        gl_Position = projectionMatrix * viewPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        float rim = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 3.0);
        gl_FragColor = vec4(0.22, 0.58, 1.0, rim * 0.5);
      }
    `,
  });
  const atmosphere = new THREE.Mesh(sphere, atmosphereMaterial);
  atmosphere.scale.setScalar(1.035);
  scene.add(atmosphere);

  const markerGeometry = new THREE.SphereGeometry(0.019, 16, 12);
  const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xa0ffc0 });
  const marker = new THREE.Mesh(markerGeometry, markerMaterial);
  marker.position.copy(positionAt(...DUBLIN, 1.018));
  scene.add(marker);
  const ringGeometry = new THREE.RingGeometry(0.032, 0.043, 40);
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0x80efaf,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8,
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  ring.position.copy(positionAt(...DUBLIN, 1.024));
  ring.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    ring.position.clone().normalize(),
  );
  scene.add(ring);

  const orbit = new OrbitControls(camera, canvas);
  orbit.enablePan = false;
  orbit.enableZoom = false;
  orbit.rotateSpeed = 0.65;
  orbit.minPolarAngle = 0.1;
  orbit.maxPolarAngle = Math.PI - 0.1;
  orbit.update();
  orbit.saveState();
  let disposed = false;
  let loaded = false;

  /**
   * Render one frame and position the Dublin label relative to the canvas.
   * Hide the label until the texture loads or when Dublin faces away from the camera.
   * Does nothing after disposal.
   * @returns {void}
   */
  const render = () => {
    if (disposed) return;
    renderer.render(scene, camera);
    const point = marker.position.clone().project(camera);
    const facingCamera =
      marker.position.dot(camera.position.clone().sub(marker.position)) > 0;
    label.hidden = !loaded || !facingCamera;
    label.style.left = `${(point.x + 1) * 50}%`;
    label.style.top = `${(1 - point.y) * 50}%`;
  };
  orbit.addEventListener("change", render);
  /**
   * Match the drawing buffer to the square canvas without changing its CSS size.
   * Use a 250px width when layout has not provided a measurable width, then redraw.
   * @returns {void}
   */
  const resize = () => {
    const size = canvas.clientWidth || 250;
    renderer.setSize(size, size, false);
    render();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);

  const texture = new THREE.TextureLoader().load(
    earthImage,
    /**
     * Apply the loaded Earth texture and notify the UI after the first textured frame.
     * Dispose late-arriving textures if the globe has already been removed.
     * @param {THREE.Texture} map Loaded Earth colour texture.
     * @returns {void}
     */
    (map) => {
      if (disposed) {
        map.dispose();
        return;
      }
      map.colorSpace = THREE.SRGBColorSpace;
      map.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
      material.map = map;
      material.needsUpdate = true;
      loaded = true;
      render();
      onReady();
    },
    undefined,
    /**
     * Release the globe and notify the UI when loading the Earth texture fails.
     * Ignore errors after disposal to avoid updating an inactive globe.
     * @returns {void}
     */
    () => {
      if (!disposed) {
        dispose();
        onError();
      }
    },
  );
  /**
   * Stop rendering and notify the UI when the browser loses the WebGL context.
   * @param {WebGLContextEvent} event Browser context-loss event.
   * @returns {void}
   */
  const onContextLost = (event) => {
    event.preventDefault();
    dispose();
    onError();
  };
  canvas.addEventListener("webglcontextlost", onContextLost);
  resize();

  /**
   * Release GPU resources, controls, resize observation, and context-loss handling.
   * Safe to call more than once; subsequent calls have no effect.
   * @returns {void}
   */
  function dispose() {
    if (disposed) return;
    disposed = true;
    observer.disconnect();
    orbit.dispose();
    canvas.removeEventListener("webglcontextlost", onContextLost);
    texture.dispose();
    sphere.dispose();
    material.dispose();
    atmosphereMaterial.dispose();
    markerGeometry.dispose();
    markerMaterial.dispose();
    ringGeometry.dispose();
    ringMaterial.dispose();
    renderer.dispose();
  }

  return {
    /**
     * Restore the camera position and target saved when the globe was created.
     * @returns {void}
     */
    reset: () => orbit.reset(),
    /**
     * Rotate by 0.15 radians per arrow-key press, or restore the view with Home.
     * Clamp vertical rotation to avoid crossing the poles; ignore unsupported keys.
     * @param {string} key KeyboardEvent.key value supplied by the React component.
     * @returns {void}
     */
    key: (key) => {
      if (key === "Home") {
        orbit.reset();
        return;
      }
      const direction = {
        ArrowLeft: [0.15, 0],
        ArrowRight: [-0.15, 0],
        ArrowUp: [0, 0.15],
        ArrowDown: [0, -0.15],
      }[key];
      if (!direction) return;
      const spherical = new THREE.Spherical().setFromVector3(camera.position);
      spherical.theta += direction[0];
      spherical.phi = THREE.MathUtils.clamp(
        spherical.phi - direction[1],
        0.1,
        Math.PI - 0.1,
      );
      camera.position.setFromSpherical(spherical);
      orbit.update();
    },
    dispose,
  };
}
