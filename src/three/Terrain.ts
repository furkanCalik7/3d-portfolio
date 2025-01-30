import * as THREE from "three";

export default function generateTerrainMesh(
  texture: THREE.Texture,
  width: number = 10,
  height: number = 10,
  segmentsX: number = 10,
  segmentsY: number = 10,
  amplitude: number = 1
): THREE.Mesh {
  const geometry = new THREE.BufferGeometry();

  const canvas = document.createElement("canvas");
  canvas.width = texture.image.width;
  canvas.height = texture.image.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not get canvas context");
  }
  ctx.drawImage(texture.image, 0, 0);

  const vertices: number[] = [];
  for (let i = 0; i <= segmentsX; i++) {
    for (let j = 0; j <= segmentsY; j++) {
      const x = (i / segmentsX) * width - width / 2;
      const y = (j / segmentsY) * height - height / 2;

      const uvX = Math.min(
        (i / segmentsX) * texture.image.width,
        texture.image.width - 1
      );
      const uvY = Math.min(
        (j / segmentsY) * texture.image.height,
        texture.image.height - 1
      );
      const pixelData = ctx.getImageData(uvX, uvY, 1, 1).data;
      const noiseValue = pixelData[0] / 255;
      const z = (noiseValue - 0.5) * 2 * amplitude;

      vertices.push(x, y, z);
    }
  }

  // Generate indices for the geometry
  const indices: number[] = [];
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

  const phongMaterial = new THREE.MeshPhongMaterial({
    color: 0x000000, // Fixed typo: 0x00000 -> 0x000000
    flatShading: true,
    shininess: 0,
  });

  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
  });

  const terrain = new THREE.Mesh(geometry, phongMaterial);
  const wireframe = new THREE.Mesh(geometry, material);
  terrain.add(wireframe);

  return terrain;
}