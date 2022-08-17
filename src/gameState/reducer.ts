import { GameState } from '../types';
import { GameStateAction } from './actions';

const initialGameState: GameState = {
  ball: {
    position: {
      x: 40,
      y: 200,
    },
    velocity: {
      x: 0.8,
      y: 0.6,
    },
  },
};

let gameState: GameState = initialGameState;

export function gameStateReducer(
  state: GameState = initialGameState,
  action: GameStateAction,
) {
  switch (action.type) {
    case 'BALL.POSITION.UPDATE': {
      return {
        ...state,
        ball: {
          ...state.ball,
          position: action.payload,
        },
      };
    }

    case 'BALL.VELOCITY.UPDATE': {
      return {
        ...state,
        ball: {
          ...state.ball,
          velocity: action.payload,
        },
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
  gameState = {
    ...gameStateReducer(gameState, action),
  };
}
