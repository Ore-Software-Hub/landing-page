import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}
// Pega o container onde o modelo vai ser exibido
const oremodel = document.getElementById("modelo3d");

const randomIndex = Math.floor(Math.random() * 4) + 1;
const selected_model = `obj-${randomIndex}.glb`;

// Cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  isMobile()
    ? window.innerHeight / window.innerWidth
    : window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 5); // Afasta a câmera para visualizar melhor

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
isMobile() ? renderer.setSize(300, 150) : renderer.setSize(600, 300);
oremodel.appendChild(renderer.domElement);

// Adiciona luzes para iluminar o modelo
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 100);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const backLight = new THREE.DirectionalLight(0xffffff, 10);
backLight.position.set(-5, -5, -1);
scene.add(backLight);

// Carregador do modelo
const loader = new GLTFLoader();
let model;
loader.load(
  `assets/glb/${selected_model}`,
  function (gltf) {
    model = gltf.scene;
    scene.add(model);

    // Ajustes de posição e escala
    model.position.set(0, 0, 0);
    model.scale.set(1, 1, 1);

    animate();
  },
  undefined,
  function (error) {
    console.error("Erro ao carregar modelo:", error);
  }
);

// Variáveis para controle do arraste do mouse
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let rotationSpeed = 0.003; // Velocidade da rotação automática

// Evento de mouse para começar o arraste
oremodel.addEventListener("mousedown", (event) => {
  isDragging = true;
  previousMousePosition.x = event.clientX;
  previousMousePosition.y = event.clientY;
});

// Evento de mouse para parar o arraste
window.addEventListener("mouseup", () => {
  isDragging = false;
});

// Evento de movimento do mouse para girar o modelo
window.addEventListener("mousemove", (event) => {
  if (!isDragging || !model) return;

  const deltaX = event.clientX - previousMousePosition.x;
  const deltaY = event.clientY - previousMousePosition.y;

  model.rotation.y += deltaX * 0.005; // Rotação horizontal
  model.rotation.x += deltaY * 0.005; // Rotação vertical

  previousMousePosition.x = event.clientX;
  previousMousePosition.y = event.clientY;
});

// Loop de animação
function animate() {
  requestAnimationFrame(animate);

  // Rotação automática (somente se não estiver arrastando)
  if (model && !isDragging) {
    model.rotation.y += rotationSpeed;
  }

  renderer.render(scene, camera);
}
