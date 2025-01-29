import { useEffect } from "react";
import * as THREE from "three";
import "./App.css";

function App() {
  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 96;

    const canvas = document.getElementById("three");
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight);

    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const meshMaterial = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(boxGeometry, meshMaterial);
    scene.add(mesh);

    const animate = () => {
      renderer.render(scene, camera);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      window.requestAnimationFrame(animate);
    };

    animate();
  }, []);
  return (
    <>
      <div>
        <canvas id="three"></canvas>
      </div>
    </>
  );
}

export default App;
