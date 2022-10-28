import { Ball } from './Ball';
import { Collision } from './Collision';
import { getDistance } from './utils';

export function checkCollision(ball1: Ball, ball2: Ball): Collision | null {
  const distance = getDistance(ball1.position, ball2.position);

  if (distance < ball1.radius + ball2.radius) {
    return new Collision(ball1, ball2);
  }

  return null;
}

// Inspired by https://github.com/MartinHeinz/physics-visual/blob/master/index.js
export function resolveCollision(info: Collision) {
  const nx = info.dx / info.distance;
  const ny = info.dy / info.distance;
  const s = info.ball1.radius + info.ball2.radius - info.distance;
  info.ball1.position.x -= (nx * s) / 2;
  info.ball1.position.y -= (ny * s) / 2;
  info.ball2.position.x += (nx * s) / 2;
  info.ball2.position.y += (ny * s) / 2;

  // Magic...
  const k = -(
    (info.ball2.velocity.x - info.ball1.velocity.x) * nx +
    (info.ball2.velocity.y - info.ball1.velocity.y) * ny
  );
  info.ball1.velocity.x -= k * nx;
  info.ball1.velocity.y -= k * ny;
  info.ball2.velocity.x += k * nx;
  info.ball2.velocity.y += k * ny;
}
