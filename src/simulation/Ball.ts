import { Coordinates, GameConfig } from '../types';

import {
  BALL_ACCELERATION_COEFFICIENT,
  MAX_VELOCITY,
  ZERO_VELOCITY_THRESHOLD,
} from './constants';

export class Ball {
  id: number;
  isCueBall: boolean;
  radius: number;
  color: string;
  position: Coordinates;
  velocity: Coordinates;
  mass: number;

  constructor({
    id,
    isCueBall,
    radius,
    color,
    position,
    velocity,
    mass,
  }: {
    id: number;
    isCueBall: boolean;
    radius: number;
    color: string;
    position: Coordinates;
    velocity: Coordinates;
    mass: number;
  }) {
    this.id = id;
    this.isCueBall = isCueBall;
    this.radius = radius;
    this.color = color;
    this.position = position;
    this.velocity = velocity;
    this.mass = mass;
  }

  move(timeDifference: number) {
    // Update ball position
    this.position.x += timeDifference * this.velocity.x;
    this.position.y += timeDifference * this.velocity.y;

    // Update ball acceleration
    this.velocity.x *= BALL_ACCELERATION_COEFFICIENT;
    this.velocity.y *= BALL_ACCELERATION_COEFFICIENT;

    // Round very small speed values to 0
    if (Math.abs(this.velocity.x) < ZERO_VELOCITY_THRESHOLD) {
      this.velocity.x = 0;
    }

    if (Math.abs(this.velocity.y) < ZERO_VELOCITY_THRESHOLD) {
      this.velocity.y = 0;
    }

    // Limit maximum velocity
    if (Math.abs(this.velocity.x) > MAX_VELOCITY) {
      this.velocity.x = MAX_VELOCITY;
    }

    if (Math.abs(this.velocity.y) > MAX_VELOCITY) {
      this.velocity.y = MAX_VELOCITY;
    }
  }

  resolveEdgeCollision(config: GameConfig) {
    // Detect collision with right wall.
    if (this.position.x + this.radius > config.canvasWidth) {
      this.position.x = config.canvasWidth - this.radius;
      this.velocity.x = -this.velocity.x;
    }

    // Detect collision with bottom wall.
    else if (this.position.y + this.radius > config.canvasHeight) {
      this.position.y = config.canvasHeight - this.radius;
      this.velocity.y = -this.velocity.y;
    }

    // Detect collision with left wall.
    else if (this.position.x - this.radius < 0) {
      this.position.x = this.radius;
      this.velocity.x = -this.velocity.x;
    }

    // Detect collision with top wall.
    else if (this.position.y - this.radius < 0) {
      this.position.y = this.radius;
      this.velocity.y = -this.velocity.y;
    }
  }
}
