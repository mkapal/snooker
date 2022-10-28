import { GameContext } from '../types';

export function renderBalls(
  canvasContext: CanvasRenderingContext2D,
  { config: { ballRadius }, state: { balls } }: GameContext,
) {
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

    canvasContext.beginPath();
    canvasContext.strokeStyle = 'white';
    canvasContext.moveTo(ball.position.x, ball.position.y);
    canvasContext.lineTo(
      ball.position.x + ball.velocity.x * 200,
      ball.position.y + ball.velocity.y * 200,
    );
    canvasContext.stroke();
  });
}
