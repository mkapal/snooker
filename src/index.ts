import { BALL_RADIUS } from './consts';
import { Vector, Ball } from './classes';

type GameState = {
  balls: Ball[];
};

let state: GameState = {
  balls: [
    new Ball(1, 200, 100, new Vector(1, 0)),
    new Ball(2, 300, 70, new Vector(0, 0)),
    new Ball(3, 400, 300, new Vector(0, 0)),
  ],
};

const canvas = <HTMLCanvasElement> document.getElementById('table');
const ctx = canvas.getContext('2d')!;

const draw = (state: GameState) => {
  ctx.clearRect(0, 0, 1600, 900);

  ctx.save();

  ctx.font = '15px Arial';
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillText(`Balls: ${state.balls.length}`, 10, 50);

  state.balls.forEach(ball => {
    ctx.fillStyle = 'rgb(255, 0, 0)';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.font = '10px Arial';
    ctx.fillText(ball.id.toString(), ball.x, ball.y);
  });
};

function updateState(state: GameState) {
  const collisions: number[] = [];

  state.balls.forEach(ballA => {
    const collidingBalls = state.balls.filter(b => {
      if (b.id === ballA.id) {
        return false;
      }
      const d = b.distance(ballA);
      return d <= BALL_RADIUS * 2;
    });

    collidingBalls.forEach(ballB => {
      if (collisions.includes(ballA.id)) {
        return;
      }

      ballA.collide(ballB);

      if (!collisions.includes(ballB.id)) {
        collisions.push(ballB.id);
      }
    });
  });

  state.balls.forEach(ball => {
    ball.move();
  });
}

const processGameFrame = () => {
  draw(state);
  updateState(state);

  window.requestAnimationFrame(processGameFrame);
};

window.requestAnimationFrame(processGameFrame);
