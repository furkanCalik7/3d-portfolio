import { useEffect } from "react";
import * as THREE from "three";
import "./App.css";
import Three from "./Three.js";
import generateTerrainMesh from "./Terrain.js";
import { Stack, Box } from "@chakra-ui/react";

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

    three.camera.position.x = 100;
    three.camera.position.y = 23;
    three.camera.position.z = 107;

    three.animate(() => {
      // three.camera.position.x -= 0.02;
      // console.log(three.camera.position);
    });
  }, []);
  return (
    <>
      <div>
        <canvas id="three"></canvas>
        <div>
          <Stack>
            <Box background="tomato" width="%100" padding="4" color="white">
              This is a box
            </Box>

            <Box background="tomato" width="%100" padding="4" color="white">
              This is a box
            </Box>
          </Stack>
        </div>
      </div>
    </>
  );
}

export default App;
