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
    three.animate();

    function heightFunction(x, y) {
      return Math.sin(x) * Math.cos(y);
    }

    const terrain = generateTerrainMesh(30, 30, 50, 50, heightFunction);
    const quaternion = new THREE.Quaternion();

    quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    terrain.setRotationFromQuaternion(quaternion);
    terrain.scale.multiplyScalar(5);

    three.scene.add(terrain);
    three.camera.position.y = 10;
    three.camera.position.z = 30;

    // three.camera.lookAt(terrain.position);
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
