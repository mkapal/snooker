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
  const CANVAS_HEIGHT = 800;
  const SPEED_RATE = 0.1;

  let x = 150;
  let y = 400;
  let directionX = 3;
  let directionY = 2;

  let previousTime = 0;

  const step = (ctx: CanvasRenderingContext2D) => (currentTime: number) => {
    if (previousTime !== currentTime) {
      const timeDifference = currentTime - previousTime;
      const speed = SPEED_RATE * timeDifference;
      const newX = x + speed * directionX;
      const newY = y + speed * directionY;

      // Check for table boundaries (left and right)
      if (newX < BALL_RADIUS || newX >= CANVAS_WIDTH - BALL_RADIUS) {
        directionX = -directionX;
      }

      // Check for table boundaries (up and down)
      if (newY < BALL_RADIUS || newY >= CANVAS_HEIGHT - BALL_RADIUS) {
        directionY = -directionY;
      }

      // Update ball position and direction
      x = newX;
      y = newY;

      // Update ball acceleration
      directionX *= 0.993;
      directionY *= 0.993;

      // Round very small direction values to 0
      if (Math.abs(directionX) < 0.01) {
        directionX = 0;
      }

      if (Math.abs(directionY) < 0.01) {
        directionY = 0;
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
