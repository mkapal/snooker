import { renderScene } from './render';
import { handleCueDrag, simulationStep } from './simulation';
import { StepParams } from './types';

export const step = ({
  canvasContext,
  gameContext,
  next,
  previousTime = 0,
  ...stepParams
}: StepParams) => (currentTime: number) => {
  const { startTime = currentTime } = stepParams;
  const elapsedTime = currentTime - startTime;

  const timeElement = document.getElementById('time');
  if (timeElement) {
    timeElement.innerText = (elapsedTime / 1000).toFixed(2);
  }

  if (previousTime !== currentTime) {
    const timeDifference = currentTime - previousTime;
    simulationStep(timeDifference, gameContext);
    renderScene(canvasContext, gameContext);
    handleCueDrag(canvasContext, gameContext);
  }

  next(
    step({
      canvasContext,
      gameContext,
      previousTime: currentTime,
      startTime,
      next,
    }),
  );
};
