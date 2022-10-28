import { GameContext } from '../types';

import { Collision } from './Collision';
import { checkCollision, resolveCollision } from './collisions';

export function simulationStep(
  timeDifference: number,
  { state: { balls }, config }: GameContext,
) {
  for (const ball of balls) {
    ball.move(timeDifference);
  }

  const collisions: Collision[] = [];
  for (const [i, ball1] of balls.entries()) {
    for (const [j, ball2] of balls.entries()) {
      if (i < j) {
        const collisionInfo = checkCollision(ball1, ball2);
        if (collisionInfo) {
          collisions.push(collisionInfo);
        }
      }
    }
  }

  for (const ball of balls) {
    ball.resolveEdgeCollision(config);
  }

  for (const collision of collisions) {
    resolveCollision(collision);
  }
}
