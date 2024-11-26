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

const ambientLight = new THREE.AmbientLight(0x333333);
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

// Handle window resize
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
