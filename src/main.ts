import { run } from './run';

run({
  canvas: {
    width: 800,
    resolutionMultiplier: 2,
  },
  table: {
    width: 3.569,
    height: 1.778,
  },
  ball: {
    radius: 0.0525,
  },
  simulation: {
    manualStep: false,
  },
});

export {};
