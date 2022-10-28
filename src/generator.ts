import { Ball } from './simulation';

export const generateRandomBalls = (
  count: number,
  radius: number,
  mass: number,
): Ball[] =>
  Array.from(Array(count)).map(
    (_, index) =>
      new Ball({
        id: index,
        isCueBall: index === 0,
        radius: radius,
        color: `rgb(${getRandomColorComponent()},${getRandomColorComponent()},${getRandomColorComponent()})`,
        mass: mass,
        position: {
          x: Math.round(Math.random() * 1600),
          y: Math.round(Math.random() * 800),
        },
        velocity: {
          x: Math.random() - 0.5,
          y: Math.random() - 0.5,
        },
      }),
  );

const getRandomColorComponent = () => Math.round(Math.random() * 255);

export const testBalls = (radius: number, mass: number): Ball[] => [
  new Ball({
    id: 1,
    isCueBall: true,
    radius: radius,
    color: 'white',
    mass: mass,
    position: {
      x: 720,
      y: 600,
    },
    velocity: {
      x: 0,
      y: 0,
    },
  }),
  new Ball({
    id: 1,
    isCueBall: true,
    radius: radius,
    color: 'red',
    mass: mass,
    position: {
      x: 400,
      y: 600,
    },
    velocity: {
      x: 0,
      y: 0,
    },
  }),
];
