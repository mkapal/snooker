import { Coordinates, Config, GameContext } from './types';
import { setCanvasDimensions, getCanvasCoordinates } from './canvas';
import { isOnBall } from './ball';

const ZERO_VELOCITY_THRESHOLD = 0.01;

export function run(config: Config) {
  const canvasElement = document.getElementById('game') as HTMLCanvasElement;

  if (canvasElement === null) {
    alert('Error: No canvas found');
    return;
  }

  const { canvasWidth, canvasHeight, pixelsPerMeter } = setCanvasDimensions(
    canvasElement,
    config,
  );
  const ballRadius = config.ball.radius * pixelsPerMeter;

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
      pixelsPerMeter,
      ballRadius,
    },
    state: {
      ball: {
        position: {
          x: 40,
          y: 200,
        },
        velocity: {
          x: (pixelsPerMeter * 2) / 1000,
          y: (pixelsPerMeter * 1.01) / 1000,
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
      if (newX < ballRadius || newX >= canvasWidth - ballRadius) {
        velocity.x = -velocity.x;
      }

      // Check for table boundaries (up and down)
      if (newY < ballRadius || newY >= canvasHeight - ballRadius) {
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
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Draw the ball
      ctx.beginPath();
      ctx.arc(position.x, position.y, ballRadius, 0, Math.PI * 2);
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
