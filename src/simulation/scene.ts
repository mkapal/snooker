import { GameContext } from '../types';

export function renderScene(
  canvasContext: CanvasRenderingContext2D,
  {
    config: { ballRadius, canvasWidth, canvasHeight },
    state: { balls },
  }: GameContext,
) {
  // Clear the table from previous animation frame
  canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

  // Draw the balls
  balls.forEach(ball => {
    canvasContext.beginPath();
    canvasContext.arc(
      ball.position.x,
      ball.position.y,
      ballRadius,
      0,
      Math.PI * 2,
    );
    canvasContext.fillStyle = 'rgb(255,255,255)';
    canvasContext.fill();
  });
}
