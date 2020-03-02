import { Point } from './Point';

export class Vector extends Point {
  constructor(x: number, y: number) {
    super(x, y);
  }

  rotate(angle: number) {
    this._x = this._x * Math.cos(angle) + this._y * Math.sin(angle);
    this._y = -(this._x * Math.sin(angle)) + this._y * Math.cos(angle);
  }

  normalize() {
    const magnitude = Math.hypot(this._x, this._y);

    if (magnitude === 0) {
      return;
    }

    this._x /= magnitude;
    this._y /= magnitude;
  }
}
