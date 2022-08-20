import { Config, GameContext } from './types';
import { configureCanvas } from './render';
import { getGameState } from './gameState/reducer';
import { step } from './simulation';

export function run(config: Config) {
  const canvasElement = document.getElementById('game') as HTMLCanvasElement;

  if (canvasElement === null) {
    alert('Error: No canvas found');
    return;
  }

  const canvasContext = canvasElement.getContext('2d');

  if (canvasContext === null) {
    alert('Error: No canvas context available');
    return;
  }

  const computedCanvasProps = configureCanvas(canvasElement, config);

  const gameContext: GameContext = {
    canvasElement,
    config: {
      ...config,
      ...computedCanvasProps,
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
