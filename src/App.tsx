import { useEffect } from "react";
import * as THREE from "three";
import "./App.css";
import { Flex, Box } from "@chakra-ui/react";
import Three from "./three/Three";
import generateTerrainMesh from "./three/Terrain";

const App: React.FC = () => {
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
      // three.camera.position.x -= 0.02;
      // console.log(three.camera.position);
    });
  }, []);

  return (
    <>
      <div>
        <canvas id="three"></canvas>
        <Flex
          position="absolute"
          top="10rem"
          left="10rem"
          height="100vh"
          bg="black"
          alignItems="center"
          flexDirection="column"
          gap="4"
        >
          <Box
            bg="tomato"
            padding="4"
            color="white"
            width="10rem"
            textAlign="center"
          >
            Box 1
          </Box>
          <Box
            bg="teal"
            padding="4"
            color="white"
            width="10rem"
            textAlign="center"
          >
            Box 2
          </Box>
        </Flex>
      </div>
    </>
  );
};

export default App;
