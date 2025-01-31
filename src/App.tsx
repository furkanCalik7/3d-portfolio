import { useEffect } from "react";
import * as THREE from "three";
import "./App.css";
import Three from "./three/Three";
import generateTerrainMesh from "./three/Terrain";
import Navbar from "./components/ui/navbar";
import InfoList from "./components/ui/infolist";
import generateStarParticles from "./three/Stars";

const App: React.FC = () => {
  useEffect(() => {
    initThree();
  }, []);

  return (
    <>
      <canvas id="three"></canvas>
      <Navbar>
        <InfoList></InfoList>
      </Navbar>
    </>
  );
};

const initThree = () => {
  const three = new Three("three");

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    "/src/assets/noiseTexture.png",
    (texture: THREE.Texture) => {
      const terrain = generateTerrainMesh(texture, 50, 50, 100, 100, 10);
      const quaternion = new THREE.Quaternion();
      quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
      terrain.setRotationFromQuaternion(quaternion);
      terrain.scale.multiplyScalar(10);
      three.scene.add(terrain);

      const stars = generateStarParticles(10000);
      three.scene.add(stars);
    }
  );

  three.camera.position.set(100, 50, 107);
  three.animate(() => {});
};

export default App;
