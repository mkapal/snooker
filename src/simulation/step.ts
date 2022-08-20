import { getGameState } from '../gameState/reducer';
import { StepParams } from '../types';
import { clearScene, renderBalls } from '../render';
import { updateBallStates } from './balls';
import { handleCueDrag } from './cue';

export const step = (stepParams: StepParams) => (currentTime: number) => {
  const {
    canvasContext,
    gameContext,
    startTime = currentTime,
    previousTime = 0,
  } = stepParams;

  gameContext.state = getGameState();

  const elapsedTime = currentTime - startTime;

  const timeElement = document.getElementById('time');
  if (timeElement) {
    timeElement.innerText = (elapsedTime / 1000).toFixed(1);
  }

  if (previousTime !== currentTime) {
    updateBallStates(stepParams, currentTime);
    clearScene(stepParams);
    renderBalls(stepParams);
    handleCueDrag(stepParams);
  }

  window.requestAnimationFrame(
    step({
      canvasContext,
      gameContext,
      previousTime: currentTime,
      startTime,
    }),
  );
};
