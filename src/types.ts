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
};

export type Coordinates = {
  x: number;
  y: number;
};

export type GameContext = {
  canvas: HTMLCanvasElement;
  config: Config & {
    ballRadius: number;
    pixelScale: number;
  };
  state: {
    ball: {
      position: Coordinates;
      velocity: Coordinates;
    };
  };
};
