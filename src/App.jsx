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
      return Math.sin(x) * Math.cos(y); // Example height function
    }

    // Generate the terrain mesh
    const terrain = generateTerrainMesh(20, 20, 50, 50, heightFunction);
    terrain.position.x = 10;
    // three.scene.add(terrain);
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
