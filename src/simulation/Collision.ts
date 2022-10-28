import { Ball } from './Ball';
import { getDistance } from './utils';

export class Collision {
  ball1: Ball;
  ball2: Ball;

  dx: number;
  dy: number;
  distance: number;

  constructor(ball1: Ball, ball2: Ball) {
    this.ball1 = ball1;
    this.ball2 = ball2;

    this.dx = ball2.position.x - ball1.position.x;
    this.dy = ball2.position.y - ball1.position.y;
    this.distance = getDistance(ball1.position, ball2.position);
  }
}
