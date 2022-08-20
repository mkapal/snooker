import { StepParams } from '../types';

export function clearScene({
  canvasContext,
  gameContext: {
    config: { canvasWidth, canvasHeight },
  },
}: StepParams) {
  // Clear the table from previous animation frame
  canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
}
