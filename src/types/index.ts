import { Ball } from '../simulation/Ball';

export type Config = {
  table: {
    /** Table width in meters */
    width: number;

    /** Table height in meters */
    height: number;
  };
  ball: {
    /** Ball radius in meters */
    radius: number;
  };
  canvas: {
    /**
     * Canvas element width in pixels
     *
     * The height will be calculated from the table width / height ratio.
     */
    width: number;

    /**
     * How many times bigger the canvas should be rendered within the set dimensions.
     *
     * This is necessary to render the canvas in a big enough resolution
     * for high pixel density screens.
     *
     * Example:
     * - canvas is 1000 pixels wide in the browser
     * - you want to render 2000 pixels within that area
     * - you set the resolutionMultiplier to 2
     *
     * The default value is 1.
     *
     */
    resolutionMultiplier?: number;
  };
  simulation: {
    manualStep: boolean;
  };
};

export type GameContext = {
  canvasElement: HTMLCanvasElement;
  config: Config & ComputedCanvasProps;
  state: GameState;
};

export type GameConfig = Config & ComputedCanvasProps;

/** Canvas properties in pixels, computed from the config values */
export type ComputedCanvasProps = {
  ballRadius: number;
  canvasWidth: number;
  canvasHeight: number;
  pixelsPerMeter: number;
};

export type GameState = {
  balls: Ball[];
};

export type Coordinates = {
  x: number;
  y: number;
};

export type StepParams = {
  canvasContext: CanvasRenderingContext2D;
  gameContext: GameContext;
  startTime?: number;
  previousTime?: number;
  next: (callback: (time: DOMHighResTimeStamp) => void) => void;
};
