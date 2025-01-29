import { useEffect } from "react";
import * as THREE from "three";
import "./App.css";
import Three from "./Three.js";
import generateTerrainMesh from "./Terrain.js";
import { cameraFar } from "three/tsl";

function App() {
  useEffect(() => {
    const three = new Three("three");
    three.initialize();

    const textureLoader = new THREE.TextureLoader();

    textureLoader.load("/src/assets/noiseTexture.png", (texture) => {
      const terrain = generateTerrainMesh(texture, 50, 50, 100, 100, 10);
      const quaternion = new THREE.Quaternion();

      quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
      terrain.setRotationFromQuaternion(quaternion);
      terrain.scale.multiplyScalar(10);

      three.scene.add(terrain);
    });

    // three.scene.add(terrain);
    three.camera.position.y = 10;
    three.camera.position.z = 30;

    three.animate(() => {
      three.camera.position.x -= 0.02;
    });
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
