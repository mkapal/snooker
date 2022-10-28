import { Ball } from './Ball';

export class Collision {
  o1: Ball;
  o2: Ball;

  dx: number;
  dy: number;
  d: number;

  constructor(o1: Ball, o2: Ball, d: number) {
    this.o1 = o1;
    this.o2 = o2;

    this.dx = o2.position.x - o1.position.x;
    this.dy = o2.position.y - o1.position.y;
    this.d = d;
  }
}
