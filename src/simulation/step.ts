import { getGameState, dispatch } from '../gameState/reducer';
import { Coordinates, GameContext } from '../types';
import { setBallPosition, setBallVelocity } from '../gameState/actions';
import { renderScene } from './scene';

export const ZERO_VELOCITY_THRESHOLD = 0.01;
export const BALL_ACCELERATION_COEFFICIENT = 0.9935;

type StepParams = {
  canvasContext: CanvasRenderingContext2D;
  gameContext: GameContext;
  startTime: number | undefined;
  previousTime: number;
  elapsedTime: number;
};

export const step = ({
  canvasContext,
  gameContext,
  gameContext: {
    config: { ballRadius, canvasWidth, canvasHeight },
  },
  startTime,
  elapsedTime,
  previousTime,
}: StepParams) => (currentTime: number) => {
  gameContext.state = getGameState();

  if (startTime === undefined) {
    startTime = currentTime;
  }

  elapsedTime = currentTime - startTime;

  const timeElement = document.getElementById('time');
  if (timeElement) {
    timeElement.innerText = (elapsedTime / 1000).toFixed(1);
  }

  if (previousTime !== currentTime) {
    const { position, velocity } = gameContext.state.ball;

    const timeDifference = currentTime - previousTime;

    const newPosition: Coordinates = {
      x: position.x + timeDifference * velocity.x,
      y: position.y + timeDifference * velocity.y,
    };
    const newVelocity: Coordinates = {
      x: velocity.x,
      y: velocity.y,
    };

    // Check for table boundaries (left and right)
    if (
      newPosition.x < ballRadius ||
      newPosition.x >= canvasWidth - ballRadius
    ) {
      newVelocity.x = -velocity.x;
    }

    // Check for table boundaries (up and down)
    if (
      newPosition.y < ballRadius ||
      newPosition.y >= canvasHeight - ballRadius
    ) {
      newVelocity.y = -velocity.y;
    }

    // Update ball acceleration
    newVelocity.x *= BALL_ACCELERATION_COEFFICIENT;
    newVelocity.y *= BALL_ACCELERATION_COEFFICIENT;

    // Round very small speed values to 0
    if (Math.abs(newVelocity.x) < ZERO_VELOCITY_THRESHOLD) {
      newVelocity.x = 0;
    }

    if (Math.abs(newVelocity.y) < ZERO_VELOCITY_THRESHOLD) {
      newVelocity.y = 0;
    }

    // Update ball position and velocity
    dispatch(setBallPosition(newPosition));
    dispatch(setBallVelocity(newVelocity));

    renderScene(canvasContext, gameContext);

    // TODO
    // if (isDragging) {
    //   ctx.beginPath();
    //   ctx.strokeStyle = 'white';
    //   ctx.moveTo(startPoint.x, startPoint.y);
    //   ctx.lineTo(endPoint.x, endPoint.y);
    //   ctx.stroke();
    // }
  }

  previousTime = currentTime;

  window.requestAnimationFrame(
    step({
      canvasContext,
      gameContext,
      previousTime,
      elapsedTime,
      startTime,
    }),
  );
};
