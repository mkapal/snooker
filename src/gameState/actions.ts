import { Coordinates } from '../types';

type BallPositionUpdateAction = {
  type: 'BALL.POSITION.UPDATE';
  payload: Coordinates;
};

type BallVelocityUpdateAction = {
  type: 'BALL.VELOCITY.UPDATE';
  payload: Coordinates;
};

export type GameStateAction =
  | BallPositionUpdateAction
  | BallVelocityUpdateAction;

export const setBallPosition = (
  position: Coordinates,
): BallPositionUpdateAction => ({
  type: 'BALL.POSITION.UPDATE',
  payload: position,
});

export const setBallVelocity = (
  velocity: Coordinates,
): BallVelocityUpdateAction => ({
  type: 'BALL.VELOCITY.UPDATE',
  payload: velocity,
});
