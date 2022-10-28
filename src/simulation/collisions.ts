import { Ball } from './Ball';
import { Collision } from './Collision';
import { getDistance } from './utils';

export function checkCollision(ball1: Ball, ball2: Ball): Collision | null {
  const distance = getDistance(ball1.position, ball2.position);

  if (distance < ball1.radius + ball2.radius) {
    return new Collision(ball1, ball2, distance);
  }
  return null;
}

// Inspired by https://github.com/MartinHeinz/physics-visual/blob/master/index.js
export function resolveCollision(info: Collision) {
  const nx = info.dx / info.d;
  const ny = info.dy / info.d;
  const s = info.o1.radius + info.o2.radius - info.d;
  info.o1.position.x -= (nx * s) / 2;
  info.o1.position.y -= (ny * s) / 2;
  info.o2.position.x += (nx * s) / 2;
  info.o2.position.y += (ny * s) / 2;

  // Magic...
  const k =
    (-2 *
      ((info.o2.velocity.x - info.o1.velocity.x) * nx +
        (info.o2.velocity.y - info.o1.velocity.y) * ny)) /
    (1 / info.o1.mass + 1 / info.o2.mass);
  info.o1.velocity.x -= (k * nx) / info.o1.mass; // Same as before, just added "k" and switched to "m" instead of "s/2"
  info.o1.velocity.y -= (k * ny) / info.o1.mass;
  info.o2.velocity.x += (k * nx) / info.o2.mass;
  info.o2.velocity.y += (k * ny) / info.o2.mass;
}
