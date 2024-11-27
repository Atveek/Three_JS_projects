import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import starsTexture from "../image/stars.jpg";
import sunTexture from "../image/sun.jpg";
import mercuryTexture from "../image/mercury.jpg";
import venusTexture from "../image/venus.jpg";
import earthTexture from "../image/earth.jpg";
import marsTexture from "../image/mars.jpg";
import jupiterTexture from "../image/jupiter.jpg";
import saturnTexture from "../image/saturn.jpg";
import saturnRingTexture from "../image/saturn ring.png";
import uranusTexture from "../image/uranus.jpg";
import uranusRingTexture from "../image/uranus ring.png";
import neptuneTexture from "../image/neptune.jpg";
import plutoTexture from "../image/pluto.jpg";

//create render
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//create Scene
const scene = new THREE.Scene();
//create camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x55555);
scene.add(ambientLight);

// Load cube background
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
]);

const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMtl = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture),
});
const sun = new THREE.Mesh(sunGeo, sunMtl);
scene.add(sun);

//pointLight - color of light , intensity , max area of light
const pointLight = new THREE.PointLight(0xffffff, 8000, 300);
scene.add(pointLight);

//create Planet and Ring
function createPlanet(size, texture, position, ring) {
  const geo = new THREE.SphereGeometry(size, 30, 30);
  const mtl = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture),
  });
  const mesh = new THREE.Mesh(geo, mtl);
  const obj = new THREE.Object3D();
  obj.add(mesh);

  if (ring) {
    const ringGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      30
    );
    const ringMtl = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide,
    });
    const ringO = new THREE.Mesh(ringGeo, ringMtl);
    obj.add(ringO);
    ringO.position.x = position;
    ringO.rotation.x = -0.5 * Math.PI;
  }
  scene.add(obj);
  mesh.position.x = position;
  return { mesh, obj };
}

const mercury = createPlanet(3.2, mercuryTexture, 28);
const venus = createPlanet(5.8, venusTexture, 44);
const earth = createPlanet(6, earthTexture, 62);
const mars = createPlanet(4, marsTexture, 78);
const jupiter = createPlanet(12, jupiterTexture, 100);
const saturn = createPlanet(10, saturnTexture, 138, {
  innerRadius: 10,
  outerRadius: 20,
  texture: saturnRingTexture,
});
const uranus = createPlanet(7, uranusTexture, 176, {
  innerRadius: 7,
  outerRadius: 12,
  texture: uranusRingTexture,
});
const neptune = createPlanet(7, neptuneTexture, 200);
const pluto = createPlanet(2.8, plutoTexture, 216);

// Handle window resize
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  // Sun
  sun.rotateY(0.004); // Sun's rotation

  // Self-Rotation (Spin)
  mercury.mesh.rotateY(0.004); // Counterclockwise
  venus.mesh.rotateY(-0.002); // Clockwise (Retrograde)
  earth.mesh.rotateY(0.02); // Counterclockwise
  mars.mesh.rotateY(0.018); // Counterclockwise
  jupiter.mesh.rotateY(0.04); // Counterclockwise
  saturn.mesh.rotateY(0.038); // Counterclockwise
  uranus.mesh.rotateY(-0.03); // Clockwise (Retrograde)
  neptune.mesh.rotateY(0.032); // Counterclockwise
  pluto.mesh.rotateY(0.008); // Counterclockwise

  // Orbital Rotation (Around the Sun)
  mercury.obj.rotateY(0.04); // Counterclockwise
  venus.obj.rotateY(0.015); // Counterclockwise
  earth.obj.rotateY(0.01); // Counterclockwise
  mars.obj.rotateY(0.008); // Counterclockwise
  jupiter.obj.rotateY(0.002); // Counterclockwise
  saturn.obj.rotateY(0.0009); // Counterclockwise
  uranus.obj.rotateY(0.0004); // Counterclockwise
  neptune.obj.rotateY(0.0001); // Counterclockwise
  pluto.obj.rotateY(0.00007); // Counterclockwise

  renderer.render(scene, camera); // Render the scene with the camera
}

renderer.setAnimationLoop(animate);


renderer.setAnimationLoop(animate);
