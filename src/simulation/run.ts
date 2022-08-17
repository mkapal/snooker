import { Coordinates, Config, GameContext } from '../types';
import { setCanvasDimensions, getCanvasCoordinates } from '../table/canvas';
import { isOnBall } from '../table/ball';
import { getGameState, dispatch } from '../gameState/reducer';
import { setBallVelocity } from '../gameState/actions';
import { step } from './step';

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

  // Game context

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

  // Listen for mouse drag

  let startPoint: Coordinates = { x: 0, y: 0 };
  let endPoint: Coordinates = { x: 0, y: 0 };
  let isDragging = false;

  canvasElement.addEventListener('mousedown', event => {
    if (!isOnBall(event, gameContext)) {
      return;
    }

    startPoint = getCanvasCoordinates(event, gameContext);
    endPoint = startPoint;
    isDragging = true;
  });

  canvasElement.addEventListener('mousemove', event => {
    if (!isDragging) {
      return;
    }

    endPoint = getCanvasCoordinates(event, gameContext);
  });

  canvasElement.addEventListener('mouseup', event => {
    if (!isDragging) {
      return;
    }

    endPoint = getCanvasCoordinates(event, gameContext);

    dispatch(
      setBallVelocity({
        x: (endPoint.x - startPoint.x) / 100,
        y: (endPoint.y - startPoint.y) / 100,
      }),
    );

    isDragging = false;
  });

  window.requestAnimationFrame(
    step({
      canvasContext,
      gameContext,
      startTime: undefined,
      elapsedTime: 0,
      previousTime: 0,
    }),
  );
}
