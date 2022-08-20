import { getGameState, dispatch } from './state/reducer';
import { StepParams } from '../types';
import { clearScene, renderBalls } from '../render';
import { handleCueDrag } from './cueDrag';
import { doSimulationStep } from './state/actions';

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
    const timeDifference = currentTime - previousTime;
    dispatch(doSimulationStep(timeDifference, gameContext.config));
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
