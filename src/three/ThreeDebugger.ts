import * as THREE from "three";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import GUI from "lil-gui";
import Three from "./Three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type Action = "ACTION_SELECT" | "ACTION_NONE";

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
  private _tranformControl: TransformControls;
  private _debugOrbitControls: OrbitControls;

  constructor(three: Three) {
    this._three = three;
    this._renderer = three.renderer;
    this._stats = new Stats();
    this._currentAction = "ACTION_NONE";
    this._raycaster = new THREE.Raycaster();
    this._mouse = new THREE.Vector2();

    document.body.appendChild(this._stats.dom);

    this._gui = new GUI();
    this._mainCamera = three.camera;

    this._debugCamera = new THREE.PerspectiveCamera(45, 1, 1, 3000);
    this._debugCamera.position.set(300, 300, 300);
    this._debugCamera.lookAt(new THREE.Vector3(0, 0, 0));
    this._debugOrbitControls = new OrbitControls(
      this._debugCamera,
      this._renderer.domElement
    );

    this._cameraHelper = new THREE.CameraHelper(this._three.camera);
    this._three.scene.add(this._cameraHelper);

    this._tranformControl = new TransformControls(
      this._debugCamera,
      this._renderer.domElement
    );

    this._tranformControl.addEventListener("dragging-changed", (event: any) => {
      this._debugOrbitControls.enabled = !event.value;
    });

    this._three.renderer.domElement.addEventListener(
      "pointerdown",
      this.HandleMouseDown.bind(this)
    );

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
    this._debugOrbitControls?.update();

    if (this._currentAction == "ACTION_SELECT") {
      this._raycaster.setFromCamera(this._mouse, this._debugCamera);
      this._currentAction = "ACTION_NONE";
      const intersects = this._raycaster.intersectObjects(
        this._three.scene.children,
        false
      );
      if (intersects.length > 0) {
        this._tranformControl.attach(intersects[0].object);
        this._three.scene.add(this._tranformControl.getHelper());
      }
    }
  }

  private HandleMouseDown(event: PointerEvent) {
    this._currentAction = "ACTION_SELECT";
    this._mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this._mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  private switchCamera() {
    if (this._three.activeCamera == this._mainCamera) {
      this._three.activeCamera = this._debugCamera;
    } else {
      this._three.activeCamera = this._mainCamera;
    }
  }
}
