# Dublin globe

The main globe uses Three.js with a textured sphere, camera-relative sunlight,
a blue atmospheric rim, and a Dublin marker at 53.3498°N, 6.2603°W.
Drag with mouse/touch, or focus the globe and use arrow keys. Zoom is disabled.
Home or the Dublin button restores the starting orientation. The label and marker disappear behind Earth.

`createGlobe.js` owns rendering and OrbitControls. Three.js is loaded in a separate
chunk. Rendering happens only on interaction, resize, or texture load; there is
no idle animation. GPU resources, controls, and observers are disposed on unmount.

The Earth texture is bundled locally from the official Three.js examples:
https://github.com/mrdoob/three.js/blob/dev/examples/textures/planets/earth_atmos_2048.jpg
It contains imagery/clouds, not live weather.

If WebGL, texture loading, or the Three.js chunk fails, a short unavailable
message is shown beside the location. There is no alternative renderer.

No runtime third-party map requests or API keys are required.
