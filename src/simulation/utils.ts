import { Coordinates } from '../types';

export function getDistance(pointA: Coordinates, pointB: Coordinates) {
  return Math.sqrt(
    Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2),
  );
}

export function dotProduct(pointA: Coordinates, pointB: Coordinates) {
  return pointA.x * pointB.x + pointA.y * pointB.y;
}

export function getMagnitude(vector: Coordinates) {
  return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
}

export function radiansToDegrees(radians: number) {
  return radians * (180 / Math.PI);
}
