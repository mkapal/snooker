const BALL_RADIUS = 26;

let state = {
  balls: [{
    id: 1,
    x: 100,
    y: 150,
    vx: 2,
    vy: 0,
  }, {
    id: 2,
    x: 200,
    y: 120,
    vx: 0,
    vy: 0,
  }, {
    id: 3,
    x: 400,
    y: 300,
    vx: 0,
    vy: 0,
  }
  ],
};

function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;

  return Math.hypot(dx, dy);
}

function draw(ctx, state) {

  ctx.clearRect(0, 0, 1600, 900);

  ctx.save();

  state.balls.forEach(ball => {
    ctx.fillStyle = 'rgb(255, 0, 0)';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.font = '10px Arial';
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillText(ball.id, ball.x, ball.y);
  });
}

function updateState(state) {
  console.group('Update state');
  let balls = [];

  state.balls.forEach(ball => {
    console.group(`Ball ${ball.id}`);

    const otherBalls = state.balls.filter(b => b.id !== ball.id);

    let isCollision = false;
    otherBalls.forEach(otherBall => {
      console.group(`Other ball ${otherBall.id}`);
      const d = distance({
        x: ball.x + ball.vx,
        y: ball.y + ball.vy,
      }, {
        x: otherBall.x + otherBall.vx,
        y: otherBall.y + otherBall.vy,
      });

      if (d <= BALL_RADIUS * 2) {
        console.log('COLLISION', ball.id, otherBall.id, d);
        isCollision = true;

        const diffX = otherBall.x + otherBall.vx - ball.x - ball.vx;
        const diffY = otherBall.y + otherBall.vy - ball.y - ball.vy;

        const newBall = {
          ...balls.find(b => b.id === ball.id),
          ...ball,
          vx: 0,
          vy: 0,
        };

        const newOtherBall = {
          ...state.balls.find(b => b.id === otherBall.id),
          x: otherBall.x,
          y: otherBall.y,
          vx: diffX / (BALL_RADIUS * 2),
          vy: diffY / (BALL_RADIUS * 2),
        };


        const restBalls = state.balls.filter(b => b.id !== otherBall.id);

        balls = [...restBalls, newOtherBall];
      }
      console.groupEnd();
    });

    if (!isCollision) {
      balls = [
        ...balls,
        ball,
      ];
    }

    console.groupEnd();
  });

  console.group('Update positions');
  balls.forEach(ball => {
    ball.x += ball.vx;
    ball.y += ball.vy;

    // const friction = 0.01;
    //
    // if (ball.vx > friction) {
    //   ball.vx -= friction;
    // } else {
    //   ball.vx = 0;
    // }
    //
    // if (ball.vy > friction) {
    //   ball.vy -= friction;
    // } else {
    //   ball.vy = 0;
    // }

  });
  console.groupEnd();

  return {
    ...state,
    balls,
  };
}

const gameFrame = ctx => {
  draw(ctx, state);
  state = updateState(state);

  ctx.font = '15px Arial';
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillText(`Balls: ${state.balls.length}`, 10, 50);

  // window.requestAnimationFrame(gameFrame);
};

const ctx = document.getElementById('table').getContext('2d');
setInterval(() => gameFrame(ctx), 200);

// window.requestAnimationFrame(gameFrame);
