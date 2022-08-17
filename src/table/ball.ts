import { GameContext } from '../types';
import { getCanvasCoordinates } from './canvas';

export function isOnBall(event: MouseEvent, context: GameContext) {
  const mouse = getCanvasCoordinates(event, context);
  const { ball } = context.state;
  const { ballRadius } = context.config;

  const isOnBallX =
    mouse.x >= ball.position.x - ballRadius &&
    mouse.x <= ball.position.x + ballRadius;
  const isOnBallY =
    mouse.y >= ball.position.y - ballRadius &&
    mouse.y <= ball.position.y + ballRadius;

  return isOnBallX && isOnBallY;
}
