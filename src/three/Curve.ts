import * as THREE from "three";
import Three from "./Three";

export default class Curve {
  private _three: Three;
  private _curveHandlers: THREE.Mesh[];
  private _points: THREE.Vector3[];
  private _curveHandlerGeometry: THREE.BoxGeometry;
  private _curveHandlerMaterial: THREE.MeshBasicMaterial;
  private _curve: THREE.CatmullRomCurve3;
  private _line: THREE.Line;

  constructor(three: Three, initialPoints: THREE.Vector3[]) {
    this._three = three;
    this._curveHandlers = [];
    this._curveHandlerGeometry = new THREE.BoxGeometry(5, 5, 5);
    this._curveHandlerMaterial = new THREE.MeshBasicMaterial();

    this._points = initialPoints;

    for (const handlerPos of initialPoints) {
      const handle = this.createHandlerMesh();
      handle.position.copy(handlerPos);
      this._curveHandlers.push(handle);
      this._three.scene.add(handle);
    }

    this._curve = new THREE.CatmullRomCurve3(this._points);
    const interpolations = this._curve.getPoints(50);
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(
      interpolations
    );
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xfffff });
    this._line = new THREE.Line(lineGeometry, lineMaterial);
    three.scene.add(this._line);
  }

  private createHandlerMesh(): THREE.Mesh {
    return new THREE.Mesh(
      this._curveHandlerGeometry,
      this._curveHandlerMaterial
    );
  }

  addPoint(point: THREE.Vector3) {
    this._points.push(point);

    const handle = this.createHandlerMesh();
    handle.position.copy(point);
    this._curveHandlers.push(handle);
    this._three.scene.add(handle);

    this.refresh();
  }

  refresh() {
    this._curve = new THREE.CatmullRomCurve3(this._points);

    const interpolations = this._curve.getPoints(50);

    this._line.geometry.setFromPoints(interpolations);
    this._line.geometry.attributes.position.needsUpdate = true;
  }
}
