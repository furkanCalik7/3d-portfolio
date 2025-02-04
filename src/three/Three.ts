import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import GUI from "lil-gui";

export default class Three {
  SCREEN_HEIGHT: number = window.innerHeight;
  SCREEN_WIDTH: number = window.innerWidth;

  private _fov: number;
  private _canvasId: string;
  private _scene: THREE.Scene;
  private _stats?: Stats;
  private _camera: THREE.PerspectiveCamera;
  private _renderer: THREE.WebGLRenderer;
  private _orbitControls?: OrbitControls;
  private _debugCamera?: THREE.PerspectiveCamera;
  private _debugMode: boolean;
  private _gui?: GUI;
  private _helpers: THREE.Object3D[] = [];

  constructor(canvasId: string, debugMode: boolean = false) {
    this._fov = 45;
    this._canvasId = canvasId;
    this._debugMode = debugMode;

    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera(
      this._fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this._camera.position.set(100, 50, 107);

    const canvas = document.getElementById(this._canvasId) as HTMLCanvasElement;
    if (!canvas) {
      throw new Error(`Canvas element with id '${this._canvasId}' not found.`);
    }

    this._renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    // this._renderer.setPixelRatio(window.devicePixelRatio);

    document.body.appendChild(this._renderer.domElement);

    this.initLights();
    this.initOrbitControls();

    if (debugMode) {
      this.initDebugGUI();
      this.initHelpers();
      this._renderer.setScissorTest(true);
    }

    window.addEventListener("resize", this.onWindowResize.bind(this), false);
    window.addEventListener("keydown", this.handleKeyboard.bind(this), false);
  }

  private initLights(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this._scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(0, 64, 32);
    this._scene.add(spotLight);
  }

  private initOrbitControls(): void {
    this._orbitControls = new OrbitControls(
      this._camera,
      this._renderer.domElement
    );
    this._orbitControls.target.set(0, 50, 0);
    this._orbitControls.autoRotateSpeed = 0.5;
    this._orbitControls.autoRotate = true;
    this._orbitControls.enabled = false;
    this._orbitControls.update();
  }

  private initHelpers(): void {
    this._stats = new Stats();
    document.body.appendChild(this._stats.dom);

    this._debugCamera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
    this._debugCamera.position.set(300, 300, 300);
    this._debugCamera.lookAt(new THREE.Vector3(0, 0, 0));

    this.toggleHelpers(true);
  }

  private toggleHelpers(enabled: boolean): void {
    if (enabled) {
      const axesHelper = new THREE.AxesHelper(50);
      const gridHelper = new THREE.GridHelper(200, 50);
      const cameraHelper = new THREE.CameraHelper(this._camera);

      this._helpers.push(axesHelper, gridHelper, cameraHelper);
      this._scene.add(axesHelper);
      this._scene.add(gridHelper);
      this._scene.add(cameraHelper);
    } else {
      this._helpers.forEach((helper) => this._scene.remove(helper));
      this._helpers = [];
    }
  }

  private initDebugGUI(): void {
    this._gui = new GUI();

    const cameraFolder = this._gui.addFolder("Camera");
    cameraFolder.add(this._camera.position, "x", -500, 500).name("Pos X");
    cameraFolder.add(this._camera.position, "y", -500, 500).name("Pos Y");
    cameraFolder.add(this._camera.position, "z", -500, 500).name("Pos Z");
    cameraFolder.open();

    const sceneFolder = this._gui.addFolder("Scene");
    sceneFolder
      .add(this._renderer, "toneMappingExposure", 0, 2)
      .name("Exposure");
    sceneFolder.open();

    const debugFolder = this._gui.addFolder("Debug Options");
    debugFolder
      .add({ toggleHelpers: true }, "toggleHelpers")
      .name("Toggle Helpers")
      .onChange((value: boolean) => this.toggleHelpers(value));
    debugFolder.open();
  }

  public animate(callback: () => void = () => {}): void {
    window.requestAnimationFrame(() => this.animate(callback));
    this._stats?.update();
    this._orbitControls?.update();
    this.render();
    callback();
  }

  private render(): void {
    if (!this._debugMode) {
      this._renderer.render(this._scene, this._camera);
      return;
    }

    this._renderer.setClearColor(0x000000, 1);
    this._renderer.setScissor(0, 0, this.SCREEN_WIDTH / 2, this.SCREEN_HEIGHT);
    this._renderer.setViewport(0, 0, this.SCREEN_WIDTH / 2, this.SCREEN_HEIGHT);
    this._renderer.render(this._scene, this._camera);

    this._renderer.setClearColor(0x111111, 1);
    this._renderer.setScissor(
      this.SCREEN_WIDTH / 2,
      0,
      this.SCREEN_WIDTH / 2,
      this.SCREEN_HEIGHT
    );
    this._renderer.setViewport(
      this.SCREEN_WIDTH / 2,
      0,
      this.SCREEN_WIDTH / 2,
      this.SCREEN_HEIGHT
    );
    this._renderer.render(this._scene, this._debugCamera!);
  }

  private onWindowResize(): void {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private handleKeyboard(event: KeyboardEvent): void {
    if (event.key === "h") {
      this.toggleHelpers(this._helpers.length === 0);
    } else if (event.key === "d") {
      this._gui?.hide();
    }
  }

  get scene(): THREE.Scene {
    return this._scene;
  }

  get camera(): THREE.Camera {
    return this._camera;
  }

  get renderer(): THREE.WebGLRenderer {
    return this._renderer;
  }

  get orbitControls(): OrbitControls | undefined {
    return this._orbitControls;
  }
}
