import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";

export default class Three {
  private _fov: number;
  private _canvasId: string;
  private _scene: THREE.Scene;
  private _stats: Stats;
  private _camera: THREE.PerspectiveCamera;
  private _renderer: THREE.WebGLRenderer;
  private _orbitControls?: OrbitControls; // Add OrbitControls

  constructor(canvasId: string) {
    this._fov = 45;
    this._canvasId = canvasId;

    this._scene = new THREE.Scene();
    this._stats = new Stats();

    this._camera = new THREE.PerspectiveCamera(
      this._fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this._camera.position.z = 10;

    const canvas = document.getElementById(this._canvasId) as HTMLCanvasElement;
    if (!canvas) {
      throw new Error(`Canvas element with id '${this._canvasId}' not found.`);
    }

    this._renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true
    });
    this._renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this._renderer.domElement);
    // document.body.appendChild(this._stats.dom);

    this.initLights();
    this.initHelpers();
    this.initOrbitControls();

    window.addEventListener("resize", this.onWindowResize.bind(this), false);
  }

  private initLights(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    this._scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    this._scene.add(spotLight);
  }

  private initOrbitControls(): void {
    this._orbitControls = new OrbitControls(this._camera, this._renderer.domElement);
    this._orbitControls.target.set(0, 50, 0); 
    this._orbitControls.autoRotateSpeed = 0.5;
    this._orbitControls.autoRotate = true;
    this._orbitControls.enabled = false;
    this._orbitControls.update();
  }

  private initHelpers(): void {
    const axesHelper = new THREE.AxesHelper(5);
    this._scene.add(axesHelper);
  }

  public animate(callback: () => void = () => {}): void {
    window.requestAnimationFrame(() => this.animate(callback));
    this._stats.update();
    this._orbitControls?.update();
    this.render();
    callback();
  }

  private render(): void {
    this._renderer.render(this._scene, this._camera);
  }

  private onWindowResize(): void {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(window.innerWidth, window.innerHeight);
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