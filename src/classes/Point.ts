export class Point {
  protected _x: number;
  protected _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  distance(point: Point) {
    const dx = this._x - point._x;
    const dy = this._y - point._y;

    return Math.hypot(dx, dy);
  }

  angle(point: Point) {
    return Math.atan2(point.y - this.y, point.x - this.x);
  }
}