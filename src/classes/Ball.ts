import { Point } from './Point';
import { Vector } from './Vector';

export class Ball extends Point {
  private _velocity: Vector;

  constructor(readonly id: number, x: number, y: number, velocity: Vector) {
    super(x, y);
    this._velocity = velocity;
  }

  get velocity() {
    return this._velocity;
  }

  set velocity(velocity: Vector) {
    this._velocity = velocity;
  }

  move() {
    this._x += this.velocity.x;
    this._y += this.velocity.y;

    // TODO : Friction
    // let vx, vy: number;
    //
    // if (this.velocity.x > BALL_FRICTION) {
    //   vx = this.velocity.x - BALL_FRICTION;
    // } else {
    //   vx = 0;
    // }
    //
    // if (this.velocity.y > BALL_FRICTION) {
    //   vy = this.velocity.y - BALL_FRICTION;
    // } else {
    //   vy = 0;
    // }
    //
    // this._velocity = new Vector(vx, vy);
  }

  collide(ball: Ball) {
    const delta = this.angle(ball);

    // TODO
    ball.velocity = this.velocity;
    ball.velocity.rotate(-delta);
    this._velocity = new Vector(0, 0);
  }
}
