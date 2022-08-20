import { GameContext } from '../types';
import { getCanvasCoordinates } from '../render';

export function isOnCueBall(event: MouseEvent, context: GameContext) {
  const mouse = getCanvasCoordinates(event, context);
  const { balls } = context.state;
  const { ballRadius } = context.config;

  const cueBall = balls.find(ball => ball.isCueBall);

  if (!cueBall) {
    return false;
  }

  const isOnBallX =
    mouse.x >= cueBall.position.x - ballRadius &&
    mouse.x <= cueBall.position.x + ballRadius;
  const isOnBallY =
    mouse.y >= cueBall.position.y - ballRadius &&
    mouse.y <= cueBall.position.y + ballRadius;

  return isOnBallX && isOnBallY;
}
