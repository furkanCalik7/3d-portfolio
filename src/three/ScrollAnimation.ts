import Three from "./Three";

export default class ScreenAnimation {
  private _three: Three;

  constructor(three: Three) {
    this._three = three;
  }

  animate() {
    if (window.scrollY > 200) {
      this._three.camera.position.x = 100;
    } else {
      this._three.camera.position.x = 200;
    }
  }
}
