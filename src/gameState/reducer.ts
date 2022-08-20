import { GameState } from '../types';
import { GameStateAction } from './actions';

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
  ],
};

let gameState: GameState = initialGameState;

export function gameStateReducer(
  state: GameState = initialGameState,
  action: GameStateAction,
): GameState {
  switch (action.type) {
    case 'BALL.POSITION.UPDATE': {
      const ball = state.balls.find(ball => ball.id === action.payload.id);

      if (!ball) {
        return {
          ...state,
        };
      }

      return {
        ...state,
        balls: [
          ...state.balls.filter(ball => ball.id !== action.payload.id),
          {
            ...ball,
            position: action.payload.position,
          },
        ],
      };
    }

    case 'BALL.VELOCITY.UPDATE': {
      const ball = state.balls.find(ball => ball.id === action.payload.id);

      if (!ball) {
        return {
          ...state,
        };
      }

      return {
        ...state,
        balls: [
          ...state.balls.filter(ball => ball.id !== action.payload.id),
          {
            ...ball,
            velocity: action.payload.velocity,
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
