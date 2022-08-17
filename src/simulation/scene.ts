import { GameContext } from '../types';

export function renderScene(
  canvasContext: CanvasRenderingContext2D,
  {
    config: { ballRadius, canvasWidth, canvasHeight },
    state: { ball },
  }: GameContext,
) {
  // Clear the table from previous animation frame
  canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);

  // Draw the ball
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
}
