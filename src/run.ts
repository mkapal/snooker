import { Config, GameContext } from './types';
import { setCanvasDimensions } from './render';
import { getGameState } from './gameState/reducer';
import { step } from './simulation';

export function run(config: Config) {
  const canvasElement = document.getElementById('game') as HTMLCanvasElement;

  if (canvasElement === null) {
    alert('Error: No canvas found');
    return;
  }

  const { canvasWidth, canvasHeight, pixelsPerMeter } = setCanvasDimensions(
    canvasElement,
    config,
  );
  const ballRadius = config.ball.radius * pixelsPerMeter;

  const canvasContext = canvasElement.getContext('2d');

  if (canvasContext === null) {
    alert('Error: No canvas context available');
    return;
  }

  const gameContext: GameContext = {
    canvasElement,
    config: {
      ...config,
      pixelsPerMeter,
      ballRadius,
      canvasWidth,
      canvasHeight,
    },
    state: getGameState(),
  };

  window.requestAnimationFrame(
    step({
      canvasContext,
      gameContext,
    }),
  );
}
