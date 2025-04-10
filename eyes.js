// Remove the import line and use the global THREE object

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 6;  // Adjusted camera position

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create base materials
const whiteMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    roughness: 0.2,
    metalness: 0.1
});
const blackMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });

// Create eyes (flat circles)
const eyeGeometry = new THREE.CircleGeometry(2.0, 32);  // Increased from 1.5 to 2.0
const leftEye = new THREE.Mesh(eyeGeometry, whiteMaterial);
const rightEye = new THREE.Mesh(eyeGeometry, whiteMaterial);
leftEye.position.set(-3.0, 0, 0);  // Increased spacing
rightEye.position.set(3.0, 0, 0);  // Increased spacing

// Create pupils
const pupilGeometry = new THREE.CircleGeometry(0.9, 32);  // Increased from 0.7 to 0.9
const leftPupil = new THREE.Mesh(pupilGeometry, blackMaterial);
const rightPupil = new THREE.Mesh(pupilGeometry, blackMaterial);
leftPupil.position.set(-3.0, 0, 0.01);  // Adjusted to match eye position
rightPupil.position.set(3.0, 0, 0.01);  // Adjusted to match eye position

// Create shadows
const shadowGeometry = new THREE.CircleGeometry(2.1, 32);  // Increased from 1.6 to 2.1
const shadowMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.1
});

const leftShadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
const rightShadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
leftShadow.position.set(-3.0, -0.25, -0.1);  // Adjusted position
rightShadow.position.set(3.0, -0.25, -0.1);  // Adjusted position
leftShadow.scale.y = 0.3;
rightShadow.scale.y = 0.3;

// Add everything to scene
scene.add(leftShadow, rightShadow, leftEye, rightEye, leftPupil, rightPupil);

// Lighting
const mainLight = new THREE.DirectionalLight(0xffffff, 1);
mainLight.position.set(0, 0, 5);
scene.add(mainLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Mouse tracking
window.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;

    const maxOffset = 0.5;  // Increased from 0.4 to 0.5
    leftPupil.position.x = -3.0 + (x * maxOffset);  // Adjusted to match eye position
    leftPupil.position.y = y * maxOffset;
    rightPupil.position.x = 3.0 + (x * maxOffset);  // Adjusted to match eye position
    rightPupil.position.y = y * maxOffset;
});

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
