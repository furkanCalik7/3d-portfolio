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
import Curve from "./three/Curve";

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
          <Route path="/" />
          <Route path="/projects" element={<ProjectsPage></ProjectsPage>} />
          <Route path="/contact" element={<ContactPage></ContactPage>} />
        </Routes>
      </Navbar>
    </Router>
  );
};

const initThree = () => {
  const three = new Three("three", !import.meta.env.PROD);
  const scrollAnimation = new ScrollAnimation(three);

  // loadTerrain(three);
  // laodStarParticles(three);
  loadCurve(three);

  three.camera.position.set(100, 50, 107);
  three.animate(() => {
    scrollAnimation.animate();
  });
};

const loadTerrain = (three: Three) => {
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
    }
  );
};

const laodStarParticles = (three: Three) => {
  const stars = generateStarParticles(STAR_COUNT, three.camera);
  three.scene.add(stars);
};

const loadCurve = (three: Three) => {
  const curve = new Curve(three, [
    new THREE.Vector3(20, 20, 20),
    new THREE.Vector3(20, 5, 10),
    new THREE.Vector3(20, 0, -10),
  ]);
};

export default App;
