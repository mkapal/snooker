function run() {
  const canvas = document.getElementById('game') as HTMLCanvasElement;

  if (canvas === null) {
    alert('Error: No canvas found');
    return;
  }

  const ctx = canvas.getContext('2d');

  if (ctx === null) {
    alert('Error: No canvas context available');
    return;
  }

  const BALL_RADIUS = 20;
  const CANVAS_WIDTH = 1200;
  const CANVAS_HEIGHT = 1000;
  const ZERO_VELOCITY_THRESHOLD = 0.01;

  let x = 150;
  let y = BALL_RADIUS;

  // Pixels per millisecond
  let velocityX = 2;
  let velocityY = 1;

  let startTime: number | undefined;
  let elapsedTime = 0;
  let previousTime = 0;

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
      const newX = x + timeDifference * velocityX;
      const newY = y + timeDifference * velocityY;

      // Check for table boundaries (left and right)
      if (newX < BALL_RADIUS || newX >= CANVAS_WIDTH - BALL_RADIUS) {
        velocityX = -velocityX;
      }

      // Check for table boundaries (up and down)
      if (newY < BALL_RADIUS || newY >= CANVAS_HEIGHT - BALL_RADIUS) {
        velocityY = -velocityY;
      }

      // Update ball position and direction
      x = newX;
      y = newY;

      // Update ball acceleration
      velocityX *= 0.993;
      velocityY *= 0.993;

      // Round very small direction values to 0
      if (Math.abs(velocityX) < ZERO_VELOCITY_THRESHOLD) {
        velocityX = 0;
      }

      if (Math.abs(velocityY) < ZERO_VELOCITY_THRESHOLD) {
        velocityY = 0;
      }

      // Clear the table from previous animation frame
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw the ball
      ctx.beginPath();
      ctx.arc(x, y, BALL_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = 'rgb(255,255,0)';
      ctx.fill();
    }

    previousTime = currentTime;

    window.requestAnimationFrame(step(ctx));
  };

  window.requestAnimationFrame(step(ctx));
}

run();

export {};
