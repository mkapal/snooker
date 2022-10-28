import { GameContext } from '../types';

import { renderBalls } from './balls';

export function renderScene(
  canvasContext: CanvasRenderingContext2D,
  gameContext: GameContext,
) {
  canvasContext.clearRect(
    0,
    0,
    gameContext.config.canvasWidth,
    gameContext.config.canvasHeight,
  );

  renderBalls(canvasContext, gameContext);
}
