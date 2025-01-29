import * as THREE from "three";

export default function generateTerrainMesh(
  width = 10,
  height = 10,
  segmentsX = 10,
  segmentsY = 10,
  heightFunction = null
) {
  const geometry = new THREE.BufferGeometry();

  const vertices = [];
  for (let i = 0; i <= segmentsX; i++) {
    for (let j = 0; j <= segmentsY; j++) {
      const x = (i / segmentsX) * width - width / 2; // Center the terrain
      const y = (j / segmentsY) * height - height / 2; // Center the terrain
      const z = heightFunction ? heightFunction(x, y) : 0; // Use the height function if provided
      vertices.push(x, y, z);
    }
  }

  const indices = [];
  for (let i = 0; i < segmentsX; i++) {
    for (let j = 0; j < segmentsY; j++) {
      const a = i * (segmentsY + 1) + j;
      const b = a + 1;
      const c = (i + 1) * (segmentsY + 1) + j;
      const d = c + 1;

      indices.push(a, b, c);
      indices.push(b, d, c);
    }
  }
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.setIndex(indices);

  geometry.computeVertexNormals();

  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
  });

  const terrain = new THREE.Mesh(geometry, material);
  return terrain;
}
