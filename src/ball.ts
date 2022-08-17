import { GameContext } from './types';
import { getCanvasCoordinates } from './canvas';

export function isOnBall(event: MouseEvent, context: GameContext) {
  const mouse = getCanvasCoordinates(event, context);
  const { position: ballPosition } = context.state.ball;
  const { ballRadius } = context.config;

  const isOnBallX =
    mouse.x >= ballPosition.x - ballRadius &&
    mouse.x <= ballPosition.x + ballRadius;
  const isOnBallY =
    mouse.y >= ballPosition.y - ballRadius &&
    mouse.y <= ballPosition.y + ballRadius;

  return isOnBallX && isOnBallY;
}
