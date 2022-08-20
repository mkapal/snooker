import {
  ComputedCanvasProps,
  Config,
  Coordinates,
  GameContext,
} from '../types';

export function configureCanvas(
  canvasElement: HTMLCanvasElement,
  config: Config,
): ComputedCanvasProps {
  const { canvas, table } = config;
  const { resolutionMultiplier = 1 } = canvas;

  const pixelsPerMeter = (canvas.width / table.width) * resolutionMultiplier;

  const canvasWidth = table.width * pixelsPerMeter;
  const canvasHeight = table.height * pixelsPerMeter;
  const ballRadius = config.ball.radius * pixelsPerMeter;

  canvasElement.style.width = `${canvas.width}px`;
  canvasElement.style.height = `${canvas.width *
    (canvasHeight / canvasWidth)}px`;

  canvasElement.width = canvasWidth;
  canvasElement.height = canvasHeight;

  return {
    ballRadius,
    canvasWidth,
    canvasHeight,
    pixelsPerMeter,
  };
}

export function getCanvasCoordinates(
  event: MouseEvent,
  context: GameContext,
): Coordinates {
  const boundingClientRect = context.canvasElement.getBoundingClientRect();
  const x = event.clientX - boundingClientRect.left,
    y = event.clientY - boundingClientRect.top;
  const scale = context.config.canvas.resolutionMultiplier ?? 1;

  return {
    x: x * scale,
    y: y * scale,
  };
}
