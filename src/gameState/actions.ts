import { Coordinates } from '../types';

type BallPositionUpdateAction = {
  type: 'BALL.POSITION.UPDATE';
  payload: {
    id: number;
    position: Coordinates;
  };
};

type BallVelocityUpdateAction = {
  type: 'BALL.VELOCITY.UPDATE';
  payload: {
    id: number;
    velocity: Coordinates;
  };
};

export type GameStateAction =
  | BallPositionUpdateAction
  | BallVelocityUpdateAction;

export const setBallPosition = (
  id: number,
  position: Coordinates,
): BallPositionUpdateAction => ({
  type: 'BALL.POSITION.UPDATE',
  payload: {
    id,
    position,
  },
});

export const setBallVelocity = (
  id: number,
  velocity: Coordinates,
): BallVelocityUpdateAction => ({
  type: 'BALL.VELOCITY.UPDATE',
  payload: {
    id,
    velocity,
  },
});
