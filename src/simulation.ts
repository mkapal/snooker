import { Coordinates, Config, GameContext } from './types';

const ZERO_VELOCITY_THRESHOLD = 0.01;

export function run(config: Config) {
  const canvasElement = document.getElementById('game') as HTMLCanvasElement;

  if (canvasElement === null) {
    alert('Error: No canvas found');
    return;
  }

  // Set canvas dimensions

  const { canvas, table, ball } = config;
  const { resolutionMultiplier = 1 } = canvas;

  const PIXEL_SCALE = (canvas.width / table.width) * resolutionMultiplier;

  const CANVAS_WIDTH = table.width * PIXEL_SCALE;
  const CANVAS_HEIGHT = table.height * PIXEL_SCALE;
  const BALL_RADIUS = ball.radius * PIXEL_SCALE;

  canvasElement.style.width = `${canvas.width}px`;
  canvasElement.style.height = `${canvas.width *
    (CANVAS_HEIGHT / CANVAS_WIDTH)}px`;

  canvasElement.width = CANVAS_WIDTH;
  canvasElement.height = CANVAS_HEIGHT;

  const ctx = canvasElement.getContext('2d');

  if (ctx === null) {
    alert('Error: No canvas context available');
    return;
  }

  // Game context

  const gameContext: GameContext = {
    canvas: canvasElement,
    config: {
      ...config,
      pixelScale: PIXEL_SCALE,
      ballRadius: BALL_RADIUS,
    },
    state: {
      ball: {
        position: {
          x: 40,
          y: 200,
        },
        velocity: {
          x: (PIXEL_SCALE * 2) / 1000,
          y: (PIXEL_SCALE * 1.01) / 1000,
        },
      },
    },
  };

  let startTime: number | undefined;
  let elapsedTime = 0;
  let previousTime = 0;

  // Listen for mouse drag

  let startPoint: Coordinates = { x: 0, y: 0 };
  let endPoint: Coordinates = { x: 0, y: 0 };
  let isDragging = false;

  canvasElement.addEventListener('mousedown', event => {
    if (!isOnBall(event, gameContext)) {
      return;
    }

    startPoint = getCanvasCoordinates(event, gameContext);
    endPoint = startPoint;
    isDragging = true;
  });

  canvasElement.addEventListener('mousemove', event => {
    if (!isDragging) {
      return;
    }

    endPoint = getCanvasCoordinates(event, gameContext);
  });

  canvasElement.addEventListener('mouseup', event => {
    if (!isDragging) {
      return;
    }

    endPoint = getCanvasCoordinates(event, gameContext);

    gameContext.state.ball.velocity.x = (endPoint.x - startPoint.x) / 100;
    gameContext.state.ball.velocity.y = (endPoint.y - startPoint.y) / 100;
    isDragging = false;
  });

  const step = (ctx: CanvasRenderingContext2D) => (currentTime: number) => {
    if (startTime === undefined) {
      startTime = currentTime;
    }

    elapsedTime = currentTime - startTime;

    const timeElement = document.getElementById('time');
    if (timeElement) {
      timeElement.innerText = (elapsedTime / 1000).toFixed(1);
    }

    if (previousTime !== currentTime) {
      const { position, velocity } = gameContext.state.ball;

      const timeDifference = currentTime - previousTime;
      const newX =
        position.x + timeDifference * gameContext.state.ball.velocity.x;
      const newY =
        position.y + timeDifference * gameContext.state.ball.velocity.y;

      // Check for table boundaries (left and right)
      if (newX < BALL_RADIUS || newX >= CANVAS_WIDTH - BALL_RADIUS) {
        velocity.x = -velocity.x;
      }

      // Check for table boundaries (up and down)
      if (newY < BALL_RADIUS || newY >= CANVAS_HEIGHT - BALL_RADIUS) {
        velocity.y = -velocity.y;
      }

      // Update ball position
      position.x = newX;
      position.y = newY;

      // Update ball acceleration
      velocity.x *= 0.9935;
      velocity.y *= 0.9935;

      // Round very small speed values to 0
      if (Math.abs(velocity.x) < ZERO_VELOCITY_THRESHOLD) {
        velocity.x = 0;
      }

      if (Math.abs(velocity.y) < ZERO_VELOCITY_THRESHOLD) {
        velocity.y = 0;
      }

      // Clear the table from previous animation frame
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw the ball
      ctx.beginPath();
      ctx.arc(position.x, position.y, BALL_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = 'rgb(255,255,0)';
      ctx.fill();

      if (isDragging) {
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.stroke();
      }
    }

    previousTime = currentTime;

    window.requestAnimationFrame(step(ctx));
  };

  window.requestAnimationFrame(step(ctx));
}

function isOnBall(event: MouseEvent, context: GameContext) {
  const mouse = getCanvasCoordinates(event, context);
  const { position: ballPosition } = context.state.ball;
  const { ballRadius } = context.config;

  const isOnBallX =
    mouse.x >= ballPosition.x - ballRadius &&
    mouse.x <= ballPosition.x + ballRadius;
  const isOnBallY =
    mouse.y >= ballPosition.y - ballRadius &&
    mouse.y <= ballPosition.y + ballRadius;

  return isOnBallX && isOnBallY;
}

function getCanvasCoordinates(
  event: MouseEvent,
  context: GameContext,
): Coordinates {
  const x = event.clientX - context.canvas.getBoundingClientRect().left,
    y = event.clientY - context.canvas.getBoundingClientRect().top;
  const scale = context.config.canvas.resolutionMultiplier ?? 1;

  return {
    x: x * scale,
    y: y * scale,
  };
}
