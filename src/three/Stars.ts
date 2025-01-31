import * as THREE from "three";

const generateStarsMesh = (starCount: number) => {
    const geometry = new THREE.BufferGeometry();
    const vertices = []

    for(let i = 0; i < starCount; i++) {
        const x = THREE.MathUtils.randFloatSpread(2000);
        const y = THREE.MathUtils.randFloatSpread(2000);
        const z = THREE.MathUtils.randFloatSpread(2000);

        vertices.push(x, y, z);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
        color: 0xffffff
    });
    

    const points = new THREE.Points(geometry, material);
    return points

}


export default generateStarsMesh