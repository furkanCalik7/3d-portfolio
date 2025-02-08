import { useEffect } from "react";
import * as THREE from "three";
import "./App.css";
import Three from "./three/Three";
import generateTerrainMesh from "./three/Terrain";
import Navbar from "./components/ui/navbar";
import generateStarParticles from "./three/Stars";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProjectsPage from "./pages/projects";
import ContactPage from "./pages/contact";
import ScrollAnimation from "./three/ScrollAnimation";
import Curve from "./three/Curve";
import GUI from "lil-gui";
import { ThreeDebugger } from "./three/ThreeDebugger";
import HomePage from "./pages/home";

const STAR_COUNT = 10000;
const THREE_CANVAS_REF_NAME = "three";

const App: React.FC = () => {
  useEffect(() => {
    initThree();
  }, []);

  return (
    <Router>
      <canvas id={THREE_CANVAS_REF_NAME}></canvas>
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
  const three = new Three(THREE_CANVAS_REF_NAME);
  let threeDebugger: ThreeDebugger | undefined;
  let gui: GUI | undefined;

  if (!import.meta.env.PROD) {
    gui = new GUI();
    threeDebugger = new ThreeDebugger(three, gui);
  }

  const scrollAnimation = new ScrollAnimation(three);

  loadTerrain(three);
  laodStarParticles(three);
  // const curve = loadCurve(three);

  three.camera.position.set(100, 50, 107);
  three.animate(() => {
    scrollAnimation.animate();
    if (!import.meta.env.PROD) {
      // curve.updateSpline();
      threeDebugger?.update();
    }
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

const loadCurve = (three: Three): Curve => {
  return new Curve(three, [
    new THREE.Vector3(20, 20, 20),
    new THREE.Vector3(20, 5, 10),
    new THREE.Vector3(20, 0, -10),
  ]);
};

export default App;
