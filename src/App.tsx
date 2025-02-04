import { useEffect } from "react";
import * as THREE from "three";
import "./App.css";
import Three from "./three/Three";
import generateTerrainMesh from "./three/Terrain";
import Navbar from "./components/ui/navbar";
import HomePage from "./pages/home";
import generateStarParticles from "./three/Stars";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProjectsPage from "./pages/projects";
import ContactPage from "./pages/contact";
import ScrollAnimation from "./three/ScrollAnimation";

const STAR_COUNT = 10000;

const App: React.FC = () => {
  useEffect(() => {
    initThree();
  }, []);

  return (
    <Router>
      <canvas id="three"></canvas>
      <Navbar>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/projects" element={<ProjectsPage></ProjectsPage>} />
          <Route path="/contact" element={<ContactPage></ContactPage>} />
        </Routes>
      </Navbar>
    </Router>
  );
};

const initThree = () => {
  const three = new Three("three", true);
  const scrollAnimation = new ScrollAnimation(three);
  const textureLoader = new THREE.TextureLoader();

  textureLoader.load(
    new URL("/noiseTexture.png", import.meta.url).href,
    (texture: THREE.Texture) => {
      const terrain = generateTerrainMesh(texture, 50, 50, 100, 100, 10);
      const quaternion = new THREE.Quaternion();
      quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
      terrain.setRotationFromQuaternion(quaternion);
      terrain.scale.multiplyScalar(10);
      three.scene.add(terrain);

      const stars = generateStarParticles(STAR_COUNT, three.camera);
      three.scene.add(stars);
    }
  );

  three.camera.position.set(100, 50, 107);
  three.animate(() => {
    scrollAnimation.animate();
  });
};

export default App;
