import * as THREE from 'three';

// Basic webgl Setup Boilerplate 
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const canvas = document.querySelector('#star-viewport');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Textures
const loader = new THREE.TextureLoader();
const spaceTex = loader.load('./src/assets/surface.png');

// 1. planet sphere
const planetGeo = new THREE.SphereGeometry(1.6, 32, 32);
const planetMat = new THREE.MeshBasicMaterial({ map: spaceTex});
const planetMesh = new THREE.Mesh(planetGeo, planetMat);
planetMesh.position.x = 2;
scene.add(planetMesh);


// Telementary ring System
const ringGeo = new THREE.TorusGeometry(2.3, 0.02, 16, 100);
const ringMat = new THREE.MeshBasicMaterial({ color: 0x4cc9f0, wireframe: true });
const ringMesh = new THREE.Mesh(ringGeo, ringMat);
ringMesh.position.x = 2;
ringMesh.rotation.x = Math.PI / 2.3; // hand-turned tilt angle 
scene.add(ringMesh);

// Voyager Capsule Box
const probeGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.6, 6);
const probeMat = new THREE.MeshBasicMaterial({ color: 0xBe9aaf , wireframe: true});
const probeMesh = new THREE.Mesh(probeGeo, probeMat);
probeMesh.position.set( -1, 0.4, 1.5 );
scene.add(probeMesh);

// Render Loop Variable 
let t = 0;

function animate( ) {
  requestAnimationFrame(animate);

  // Standard Rotatios
  planetMesh.rotation.y += 0.002;
  ringMesh.rotation.z -= 0.001;

  // Voyager float Simulation
  t += 0.01;
  probeMesh.rotation.x += 0.04;
  probeMesh.rotation.y += 0.05;
  probeMesh.position.y = 0.4 + (Math.sin(t) * 0.05);
  renderer.render(scene, camera);
}
animate();

// viewport resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});