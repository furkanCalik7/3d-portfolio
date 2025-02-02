import * as THREE from "three";

const generateStarParticles = (
  starCount: number,
  camera: THREE.Camera,
  minStarDistanceToCamera: number = 200
) => {
  const geometry = new THREE.BufferGeometry();
  const vertices = [];

  for (let i = 0; i < starCount; i++) {
    const x = THREE.MathUtils.randFloatSpread(2000);
    const y = THREE.MathUtils.randFloatSpread(2000);
    const z = THREE.MathUtils.randFloatSpread(2000);
    if (
      camera.position.distanceTo(new THREE.Vector3(x, y, z)) >
      minStarDistanceToCamera
    ) {
      vertices.push(x, y, z);
    }
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
  });

  const points = new THREE.Points(geometry, material);
  return points;
};

export default generateStarParticles;
