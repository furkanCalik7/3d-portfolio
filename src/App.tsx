import { useEffect } from "react";
import * as THREE from "three";
import "./App.css";
import Three from "./three/Three";
import generateTerrainMesh from "./three/Terrain";
import Navbar from "./components/ui/navbar";
import InfoList from "./components/ui/infolist";

const App: React.FC = () => {
  initThree();
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
  useEffect(() => {
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
      }
    );
    three.camera.position.x = 100;
    three.camera.position.y = 23;
    three.camera.position.z = 107;
    three.animate(() => {
      three.camera.position.x -= 0.02;
      // console.log(three.camera.position);
    });
  }, []);
};
export default App;
