const BALL_RADIUS = 26;

let state = {
  balls: [{
    id: 1,
    x: 140,
    y: 100,
    vx: 1,
    vy: 0,
  }, {
    id: 2,
    x: 200,
    y: 100,
    vx: 0,
    vy: 0,
  }, {
    id: 3,
    x: 300,
    y: 300,
    vx: 0,
    vy: 0,
  }
  ],
};

const normalize = (vx, vy) => {
  const magnitude = Math.hypot(vx, vy);

  if (magnitude === 0) {
    return {
      vx,
      vy,
    };
  }

  return {
    vx: vx / magnitude,
    vy: vy / magnitude,
  }
};

const rad2deg = rad => (rad / Math.PI) * 180;

const angle = (a, b) => {
  // const tanAngle = Math.abs(b.x - a.x)/Math.abs(b.y - a.y);
  // console.log({tanAngle});
  return Math.atan2(b.y - a.y, b.x - a.x);
};

const rotate = (vx, vy, angle) => ({
  vx: (vx * Math.cos(angle)) + (vy * Math.sin(angle)),
  vy: - (vx * Math.sin(angle)) + (vy * Math.cos(angle)),
});

const distance = (a, b) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;

  return Math.hypot(dx, dy);
};

const draw = (ctx, state) => {

  ctx.clearRect(0, 0, 1600, 900);

  ctx.save();
  ctx.font = '16px Arial';

  const a = {
    x: 100,
    y: 100,
  };

  const b = {
    x: 200,
    y: 200,
  };

  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.fillText(`${rad2deg(angle(a, b))}°`, 80, 80);
  ctx.stroke();

  state.balls.forEach(ball => {
    ctx.fillStyle = 'rgb(255, 0, 0)';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.font = '10px Arial';
    ctx.fillText(ball.id, ball.x, ball.y);
  });
};

function updateState(state) {
  const collisions = [];
  let balls = [...state.balls];

  state.balls.forEach(ballA => {

    let newBalls = [];

    const collidingBalls = state.balls.filter(b => {
      if (b.id === ballA.id) {
        return false;
      }
        const d = distance({
          x: ballA.x + ballA.vx,
          y: ballA.y + ballA.vy,
        }, {
          x: b.x + b.vx,
          y: b.y + b.vy,
        });
      // const d = distance({
      //   x: ballA.x,
      //   y: ballA.y,
      // }, {
      //   x: b.x,
      //   y: b.y,
      // });

      return d <= BALL_RADIUS * 2;
    });

    collidingBalls.forEach(ballB => {
      if (collisions.includes(ballA.id)) {
        return;
      }

      const delta = angle(ballA, ballB);
      console.log({delta, deg: rad2deg(delta)});

      const vxA1 = Math.sin(delta) * distance(ballA, ballB);
      const vyA1 = Math.cos(delta) * distance(ballA, ballB);

      const { vx: vxB1, vy: vyB1 } = rotate(vxA1, vyA1, -Math.PI / 2);

      const { vx: vxA, vy: vyA } = normalize(vxA1, vyA1);
      const { vx: vxB, vy: vyB } = normalize(vxB1, vyB1);

      console.log('a', {vxA, vyA});
      // console.log('b', {vxB, vyB});

      newBalls = [
        ...newBalls,
        {
          ...ballA,
          vx: vxA,
          vy: vyA,
        },
        {
          ...ballB,
          vx: 2,
          vy: 2,
          // vx: vxB,
          // vy: vyB,
        }
      ];


      const otherBalls = balls.filter(b => b.id !== ballA.id && b.id !== ballB.id);
      balls = [...otherBalls, ...newBalls];

      // console.log({newBalls, balls, otherBalls});

      if (!collisions.includes(ballB.id)) {
        collisions.push(ballB.id);
      }
    });



    // return {
    //   ...newBall,
    // };
  });

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

  return {
    ...state,
    balls,
  };
}

const gameFrame = ctx => {
  // console.log('being frame');
  draw(ctx, state);
  state = updateState(state);

  ctx.font = '15px Arial';
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillText(`Balls: ${state.balls.length}`, 10, 50);

  // window.requestAnimationFrame(gameFrame);
  // console.log('end frame');
};

const ctx = document.getElementById('table').getContext('2d');
setInterval(() => gameFrame(ctx), 100);

// window.requestAnimationFrame(gameFrame);
