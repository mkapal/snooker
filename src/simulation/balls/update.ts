import { Coordinates, BallState, ComputedCanvasProps } from '../../types';
import {
  BALL_ACCELERATION_COEFFICIENT,
  ZERO_VELOCITY_THRESHOLD,
  MAX_VELOCITY,
} from '../constants';

export function updateBallState(
  ball: BallState,
  timeDifference: number,
  { ballRadius, canvasHeight, canvasWidth }: ComputedCanvasProps,
) {
  const { position, velocity } = ball;

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

  return {
    ...ball,
    position: newPosition,
    velocity: newVelocity,
  };
}
