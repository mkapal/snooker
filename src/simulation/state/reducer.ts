import { GameState } from '../../types';
import { GameStateAction } from './actions';
import { MAX_VELOCITY } from '../constants';
import { findCueBall } from './selectors';
import { updateBallState } from '../balls';

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
        x: 0.3,
        y: 0.2,
      },
    },
    {
      id: 2,
      isCueBall: false,
      color: 'red',
      position: {
        x: 480,
        y: 530,
      },
      velocity: {
        x: -0.1,
        y: -0.1,
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
      const { timeDifference, canvasProps } = action.payload;
      const updatedBalls = state.balls.map(ball =>
        updateBallState(ball, timeDifference, canvasProps),
      );

      return {
        ...state,
        balls: updatedBalls,
      };
    }

    case 'CUE.STRIKE': {
      const cueBall = findCueBall(state);

      if (!cueBall) {
        return state;
      }

      const { dragVector } = action.payload;

      return {
        ...state,
        balls: [
          ...state.balls.filter(ball => ball.id !== cueBall.id),
          {
            ...cueBall,
            velocity: {
              x: Math.min(dragVector.x / 100, MAX_VELOCITY),
              y: Math.min(dragVector.y / 100, MAX_VELOCITY),
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
