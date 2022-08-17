type Config = {
  canvas: {
    /** Pixels */
    width: number;
  };
  table: {
    /** Meters */
    width: number;

    /** Meters */
    height: number;
  };
  ball: {
    /** Meters */
    radius: number;
  };
};

type Point = {
  x: number;
  y: number;
};

const ZERO_VELOCITY_THRESHOLD = 0.01;

export function run({ canvas, table, ball }: Config) {
  const canvasElement = document.getElementById('game') as HTMLCanvasElement;

  if (canvasElement === null) {
    alert('Error: No canvas found');
    return;
  }

  // Set dimensions

  const DPI_SCALE = 2;
  const PIXEL_SCALE = (canvas.width / table.width) * DPI_SCALE;

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

  // Ball state

  let position: Point = {
    x: 40,
    y: 200,
  };

  // Pixels per millisecond
  let velocity: Point = {
    x: (PIXEL_SCALE * 2) / 1000,
    y: (PIXEL_SCALE * 1.01) / 1000,
  };

  let startTime: number | undefined;
  let elapsedTime = 0;
  let previousTime = 0;

  // Listen for mouse drag

  let startPoint: Point = { x: 0, y: 0 };
  let endPoint: Point = { x: 0, y: 0 };
  let isDragging = false;

  canvasElement.addEventListener('mousedown', event => {
    if (!isOnBall(event, position, BALL_RADIUS, DPI_SCALE, canvasElement)) {
      return;
    }

    startPoint = getCanvasCoordinates(canvasElement, event, DPI_SCALE);
    endPoint = startPoint;
    isDragging = true;
  });

  canvasElement.addEventListener('mousemove', event => {
    if (!isDragging) {
      return;
    }

    endPoint = getCanvasCoordinates(canvasElement, event, DPI_SCALE);
  });

  canvasElement.addEventListener('mouseup', event => {
    if (!isDragging) {
      return;
    }

    endPoint = getCanvasCoordinates(canvasElement, event, DPI_SCALE);

    velocity.x = (endPoint.x - startPoint.x) / 100;
    velocity.y = (endPoint.y - startPoint.y) / 100;
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
      const timeDifference = currentTime - previousTime;
      const newX = position.x + timeDifference * velocity.x;
      const newY = position.y + timeDifference * velocity.y;

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

function isOnBall(
  event: MouseEvent,
  ball: Point,
  ballRadius: number,
  scale: number,
  canvas: HTMLCanvasElement,
) {
  const mouse = getCanvasCoordinates(canvas, event, scale);

  const isOnBallX =
    mouse.x >= ball.x - ballRadius && mouse.x <= ball.x + ballRadius;
  const isOnBallY =
    mouse.y >= ball.y - ballRadius && mouse.y <= ball.y + ballRadius;

  return isOnBallX && isOnBallY;
}

function getCanvasCoordinates(
  canvas: HTMLCanvasElement,
  event: MouseEvent,
  scale: number,
): Point {
  const x = event.clientX - canvas.getBoundingClientRect().left,
    y = event.clientY - canvas.getBoundingClientRect().top;

  return {
    x: x * scale,
    y: y * scale,
  };
}
