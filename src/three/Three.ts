import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ThreeDebugger } from "./ThreeDebugger";

export default class Three {
  SCREEN_HEIGHT: number = window.innerHeight;
  SCREEN_WIDTH: number = window.innerWidth;

  private _canvasId: string;
  private _scene: THREE.Scene;
  private _mainCamera: THREE.PerspectiveCamera;
  private _activeCamera: THREE.PerspectiveCamera;
  private _renderer: THREE.WebGLRenderer;
  private _orbitControls?: OrbitControls;
  private _debugger?: ThreeDebugger;

  constructor(canvasId: string, debugMode: boolean = false) {
    this._canvasId = canvasId;
    this._scene = new THREE.Scene();
    this._mainCamera = new THREE.PerspectiveCamera(
      25,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this._mainCamera.position.set(100, 50, 107);
    this._mainCamera.lookAt(0, 50, 0);
    this._activeCamera = this._mainCamera;

    const canvas = document.getElementById(this._canvasId) as HTMLCanvasElement;
    if (!canvas) {
      throw new Error(`Canvas element with id '${this._canvasId}' not found.`);
    }

    this._renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this._renderer.domElement);

    this.initLights();
    this.initOrbitControls();

    if (debugMode) {
      this._debugger = new ThreeDebugger(this, this._renderer);
    }

    window.addEventListener("resize", this.onWindowResize.bind(this), false);
  }

  private initLights(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this._scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(0, 64, 32);
    this._scene.add(spotLight);
  }

  private initOrbitControls(): void {
    // this._orbitControls = new OrbitControls(
    //   this._mainCamera,
    //   this._renderer.domElement
    // );
    // this._orbitControls.target.set(0, 50, 0);
    // this._orbitControls.autoRotateSpeed = 0.5;
    // this._orbitControls.autoRotate = true;
    // this._orbitControls.enabled = false;
    // this._orbitControls.update();
  }

  public animate(callback: () => void = () => {}): void {
    window.requestAnimationFrame(() => this.animate(callback));
    this._debugger?.update();
    this._orbitControls?.update();
    this.render();
    callback();
  }

  private render(): void {
    this._renderer.render(this._scene, this._activeCamera);
  }

  private onWindowResize(): void {
    this._mainCamera.aspect = window.innerWidth / window.innerHeight;
    this._mainCamera.updateProjectionMatrix();
    this._renderer.setSize(window.innerWidth, window.innerHeight);
  }

  get scene(): THREE.Scene {
    return this._scene;
  }

  get camera(): THREE.PerspectiveCamera {
    return this._mainCamera;
  }

  set camera(camera: THREE.PerspectiveCamera) {
    this._mainCamera = camera;
  }

  get activeCamera(): THREE.PerspectiveCamera {
    return this._activeCamera;
  }

  set activeCamera(camera: THREE.PerspectiveCamera) {
    this._activeCamera = camera;
  }

  get renderer(): THREE.WebGLRenderer {
    return this._renderer;
  }

  get orbitControls(): OrbitControls | undefined {
    return this._orbitControls;
  }
}
