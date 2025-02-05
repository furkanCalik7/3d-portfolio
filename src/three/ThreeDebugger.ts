import * as THREE from "three";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import GUI from "lil-gui";
import Three from "./Three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type Action = "SELECT" | "NONE";

export class ThreeDebugger {
  private _three: Three;
  private _renderer: THREE.WebGLRenderer;
  private _stats: Stats;
  private _gui: GUI;
  private _cameraHelper: THREE.CameraHelper;
  private _debugCamera: THREE.PerspectiveCamera;
  private _currentAction: Action;
  private _mouse: THREE.Vector2;
  private _raycaster: THREE.Raycaster;

  private _helpers: THREE.Object3D[] = [];
  private _mainCamera: THREE.PerspectiveCamera;
  private _transformControl: TransformControls;
  private _debugOrbitControls: OrbitControls;

  constructor(three: Three, gui: GUI) {
    this._three = three;
    this._renderer = three.renderer;
    this._stats = new Stats();
    this._currentAction = "NONE";
    this._raycaster = new THREE.Raycaster();
    this._mouse = new THREE.Vector2();
    this._mainCamera = three.camera;
    this._gui = gui;
    this._cameraHelper = new THREE.CameraHelper(this._mainCamera);
    this._debugCamera = new THREE.PerspectiveCamera(45, 1, 1, 3000);
    this._transformControl = new TransformControls(
      this._debugCamera,
      this._renderer.domElement
    );
    this._debugOrbitControls = new OrbitControls(
      this._debugCamera,
      this._renderer.domElement
    );

    this._setupDebugCamera();
    this._setupStats();
    this._setupGUI();
    this._setupHelpers();
    this._setupTransformControls();

    window.addEventListener("keydown", this._handleKeyboard.bind(this), false);
    this._three.renderer.domElement.addEventListener(
      "pointerdown",
      this._handleMouseDown.bind(this)
    );
  }

  private _setupStats(): void {
    document.body.appendChild(this._stats.dom);
  }

  private _setupDebugCamera(): void {
    this._debugCamera.position.set(300, 300, 300);
    this._debugCamera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  private _setupGUI(): void {
    const cameraFolder = this._gui.addFolder("Camera");

    cameraFolder.add(this._three.camera.position, "x", -500, 500).name("Pos X");
    cameraFolder.add(this._three.camera.position, "y", -500, 500).name("Pos Y");
    cameraFolder.add(this._three.camera.position, "z", -500, 500).name("Pos Z");

    cameraFolder
      .add(this._three.camera, "fov", 5, 50)
      .name("Fov")
      .onChange(() => this._updateCamera());
    cameraFolder
      .add({ switchCamera: () => this._switchCamera() }, "switchCamera")
      .name("Switch Camera");
    cameraFolder.open();
  }

  private _setupHelpers(): void {
    const axesHelper = new THREE.AxesHelper(50);

    this._helpers.push(axesHelper, this._cameraHelper);
    this._helpers.forEach((helper) => this._three.scene.add(helper));
  }

  private _setupTransformControls(): void {
    this._transformControl.addEventListener(
      "dragging-changed",
      (event: any) => {
        this._debugOrbitControls.enabled = !event.value;
      }
    );
    this._three.scene.add(this._transformControl.getHelper());
  }

  private _updateCamera(): void {
    this._three.camera.updateProjectionMatrix();
    this._cameraHelper.update();
  }

  private _handleKeyboard(event: KeyboardEvent): void {
    if (event.key === "h") {
      this._toggleHelpers();
    } else if (event.key === "d") {
      this._gui.hide();
    }
  }

  private _toggleHelpers(): void {
    const isEnabled = this._helpers.length > 0;
    this._helpers.forEach((helper) => this._three.scene.remove(helper));
    this._helpers = isEnabled
      ? []
      : [new THREE.AxesHelper(50), new THREE.CameraHelper(this._mainCamera)];
    this._helpers.forEach((helper) => this._three.scene.add(helper));
  }

  public update(): void {
    this._stats.update();
    this._debugOrbitControls?.update();

    if (this._currentAction === "SELECT") {
      this._raycaster.setFromCamera(this._mouse, this._debugCamera);
      this._currentAction = "NONE";
      const intersects = this._raycaster.intersectObjects(
        this._three.scene.children,
        false
      );
      if (intersects.length > 0) {
        this._transformControl.attach(intersects[0].object);
      }
    }
  }

  private _handleMouseDown(event: PointerEvent): void {
    this._currentAction = "SELECT";
    this._mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this._mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  private _switchCamera(): void {
    this._three.activeCamera =
      this._three.activeCamera === this._mainCamera
        ? this._debugCamera
        : this._mainCamera;
  }
}
