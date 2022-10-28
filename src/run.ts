import { generateRandomBalls, testBalls } from './generator';
import { configureCanvas } from './render';
import { step } from './step';
import { Config, GameContext, GameState, StepParams } from './types';

const initialGameState: GameState = {
  balls: [],
};

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

  // Populate game state with balls
  // initialGameState.balls = testBalls(computedCanvasProps.ballRadius, 20);
  initialGameState.balls = generateRandomBalls(
    100,
    computedCanvasProps.ballRadius,
    20,
  );

  const gameContext: GameContext = {
    canvasElement,
    config: {
      ...config,
      ...computedCanvasProps,
    },
    state: initialGameState,
  };

  let lastStepTime = 0;

  let handleStepButtonClick = () => {
    //
  };

  const stepButton = document.getElementById('btn-step');

  const manualStep: StepParams['next'] = callback => {
    if (!stepButton) {
      return;
    }

    stepButton.removeEventListener('click', handleStepButtonClick);
    handleStepButtonClick = () => {
      lastStepTime += 10;
      callback(lastStepTime);
    };
    stepButton.addEventListener('click', handleStepButtonClick);
  };

  const next = config.simulation.manualStep
    ? manualStep
    : window.requestAnimationFrame;

  if (!config.simulation.manualStep && stepButton) {
    stepButton.style.display = 'none';
  }

  next(
    step({
      canvasContext,
      gameContext,
      next,
    }),
  );
}
