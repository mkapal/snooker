import { Coordinates, StepParams } from '../types';
import { dispatch } from '../gameState';
import { setBallPosition, setBallVelocity } from '../gameState/actions';
import {
  BALL_ACCELERATION_COEFFICIENT,
  MAX_VELOCITY,
  ZERO_VELOCITY_THRESHOLD,
} from './constants';

export function updateBallStates(
  { gameContext, previousTime = 0 }: StepParams,
  currentTime: number,
) {
  const {
    config: { ballRadius, canvasWidth, canvasHeight },
  } = gameContext;

  const { id, position, velocity } = gameContext.state.balls[0];
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
  if (newPosition.x < ballRadius || newPosition.x >= canvasWidth - ballRadius) {
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

  if (Math.abs(newVelocity.x) > MAX_VELOCITY) {
    newVelocity.x = MAX_VELOCITY;
  }

  if (Math.abs(newVelocity.y) > MAX_VELOCITY) {
    newVelocity.y = MAX_VELOCITY;
  }

  // Update ball position and velocity
  dispatch(setBallPosition(id, newPosition));
  dispatch(setBallVelocity(id, newVelocity));
}
