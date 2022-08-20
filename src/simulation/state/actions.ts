import { ComputedCanvasProps, Coordinates } from '../../types';

type SimulationStepAction = {
  type: 'SIMULATION.STEP';
  payload: {
    timeDifference: number;
    canvasProps: ComputedCanvasProps;
  };
};

type CueStrikeAction = {
  type: 'CUE.STRIKE';
  payload: {
    dragVector: Coordinates;
  };
};

export type GameStateAction = SimulationStepAction | CueStrikeAction;

export const doSimulationStep = (
  timeDifference: number,
  canvasProps: ComputedCanvasProps,
): SimulationStepAction => ({
  type: 'SIMULATION.STEP',
  payload: {
    timeDifference,
    canvasProps,
  },
});

export const cueStrike = (dragVector: Coordinates): CueStrikeAction => ({
  type: 'CUE.STRIKE',
  payload: {
    dragVector,
  },
});
