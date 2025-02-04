import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import GUI from "lil-gui";
import Three from "./Three";

export class ThreeDebugger {
  private _three: Three;
  private _renderer: THREE.WebGLRenderer;
  private _stats: Stats;
  private _gui: GUI;
  private _cameraHelper: THREE.CameraHelper;
  private _debugCamera: THREE.PerspectiveCamera;
  private _debugOrbitControls: OrbitControls;
  private _helpers: THREE.Object3D[] = [];
  private _mainCamera: THREE.PerspectiveCamera;
  private _activeCamera: THREE.PerspectiveCamera;

  constructor(three: Three, renderer: THREE.WebGLRenderer) {
    this._three = three;
    this._renderer = renderer;
    this._stats = new Stats();
    document.body.appendChild(this._stats.dom);
    this._gui = new GUI();
    this._mainCamera = three.camera;
    this._activeCamera = this._mainCamera;

    this._debugCamera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
    this._debugCamera.position.set(300, 300, 300);
    this._debugCamera.lookAt(new THREE.Vector3(0, 0, 0));
    this._debugOrbitControls = new OrbitControls(
      this._debugCamera,
      this._renderer.domElement
    );

    this._cameraHelper = new THREE.CameraHelper(this._three.camera);
    this._three.scene.add(this._cameraHelper);
    this.initGUI();
    this.initHelpers();
    window.addEventListener("keydown", this.handleKeyboard.bind(this), false);
  }

  private initGUI(): void {
    const cameraFolder = this._gui.addFolder("Camera");
    cameraFolder.add(this._three.camera.position, "x", -500, 500).name("Pos X");
    cameraFolder.add(this._three.camera.position, "y", -500, 500).name("Pos Y");
    cameraFolder.add(this._three.camera.position, "z", -500, 500).name("Pos Z");
    cameraFolder
      .add(this._three.camera, "fov", 5, 50)
      .name("Fov")
      .onChange(() => this.updateCamera());

    cameraFolder
      .add({ switchCamera: () => this.switchCamera() }, "switchCamera")
      .name("Switch Camera");
    cameraFolder.open();
  }

  private initHelpers(): void {
    const axesHelper = new THREE.AxesHelper(50);
    this._helpers.push(axesHelper, this._cameraHelper);
    this._helpers.forEach((helper) => this._three.scene.add(helper));
  }

  private updateCamera(): void {
    this._three.camera.updateProjectionMatrix();
    this._cameraHelper.update();
  }

  private handleKeyboard(event: KeyboardEvent): void {
    if (event.key === "h") {
      this.toggleHelpers();
    } else if (event.key === "d") {
      this._gui.hide();
    }
  }

  private toggleHelpers(): void {
    const isEnabled = this._helpers.length > 0;
    this._helpers.forEach((helper) => this._three.scene.remove(helper));
    if (!isEnabled) {
      this.initHelpers();
    } else {
      this._helpers = [];
    }
  }

  public update(): void {
    this._stats.update();
    this._debugOrbitControls.update();
  }

  private switchCamera() {
    if (this._activeCamera == this._mainCamera) {
      this._three.camera = this._debugCamera;
      this._debugOrbitControls.enabled = true;
    } else {
      this._three.camera = this._mainCamera;
      this._debugOrbitControls.enabled = false;
    }
  }
}
