import { GameState, Coordinates } from '../../types';
import { GameStateAction } from './actions';
import {
  BALL_ACCELERATION_COEFFICIENT,
  ZERO_VELOCITY_THRESHOLD,
  MAX_VELOCITY,
} from '../constants';
import { findCueBall } from './selectors';

const initialGameState: GameState = {
  balls: [
    {
      id: 1,
      isCueBall: true,
      color: 'white',
      position: {
        x: 40,
        y: 200,
      },
      velocity: {
        x: 0.4,
        y: 0.3,
      },
    },
    {
      id: 2,
      isCueBall: false,
      color: 'red',
      position: {
        x: 380,
        y: 430,
      },
      velocity: {
        x: 0,
        y: 0,
      },
    },
  ],
};

let gameState: GameState = initialGameState;

export function gameStateReducer(
  state: GameState = initialGameState,
  action: GameStateAction,
): GameState {
  switch (action.type) {
    case 'SIMULATION.STEP': {
      const { id, position, velocity } = state.balls[0];
      const {
        timeDifference,
        canvasProps: { ballRadius, canvasHeight, canvasWidth },
      } = action.payload;

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

      if (Math.abs(newVelocity.x) > MAX_VELOCITY) {
        newVelocity.x = MAX_VELOCITY;
      }

      if (Math.abs(newVelocity.y) > MAX_VELOCITY) {
        newVelocity.y = MAX_VELOCITY;
      }

      const ball = state.balls.find(ball => ball.id === id);

      if (!ball) {
        return {
          ...state,
        };
      }

      return {
        ...state,
        balls: [
          ...state.balls.filter(ball => ball.id !== id),
          {
            ...ball,
            position: newPosition,
            velocity: newVelocity,
          },
        ],
      };
    }

    case 'CUE.STRIKE': {
      const cueBall = findCueBall(state);

      if (!cueBall) {
        return state;
      }

      return {
        ...state,
        balls: [
          ...state.balls.filter(ball => ball.id !== cueBall.id),
          {
            ...cueBall,
            velocity: {
              x: Math.min(action.payload.dragVector.x / 100, MAX_VELOCITY),
              y: Math.min(action.payload.dragVector.y / 100, MAX_VELOCITY),
            },
          },
        ],
      };
    }

    default: {
      return state;
    }
  }
}

export const getGameState = (): GameState =>
  JSON.parse(JSON.stringify(gameState));

export function dispatch(action: GameStateAction) {
  gameState = JSON.parse(JSON.stringify(gameStateReducer(gameState, action)));
}
