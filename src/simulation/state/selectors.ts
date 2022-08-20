import { GameState, BallState } from '../../types';

export const findCueBall = (state: GameState): BallState | undefined =>
  state.balls.find(ball => ball.isCueBall);
