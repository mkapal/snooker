import { StepParams } from '../types';

export function renderBalls({
  canvasContext,
  gameContext: {
    config: { ballRadius },
    state: { balls },
  },
}: StepParams) {
  balls.forEach(ball => {
    canvasContext.beginPath();
    canvasContext.arc(
      ball.position.x,
      ball.position.y,
      ballRadius,
      0,
      Math.PI * 2,
    );
    canvasContext.fillStyle = ball.color;
    canvasContext.fill();
  });
}
