import { getCanvasCoordinates } from '../render';
import { Coordinates, GameContext } from '../types';

import { MAX_VELOCITY } from './constants';
import { isOnCueBall } from './helpers';

let startPoint: Coordinates = { x: 0, y: 0 };
let endPoint: Coordinates = { x: 0, y: 0 };
let isDragging = false;

export function handleCueDrag(
  canvasContext: CanvasRenderingContext2D,
  gameContext: GameContext,
) {
  const { canvasElement } = gameContext;

  canvasElement.addEventListener('mousedown', handleDragStart);
  canvasElement.addEventListener('mousemove', handleDragMove);
  canvasElement.addEventListener('mouseup', handleDragEnd);

  if (isDragging) {
    renderDragLine();
  }

  function handleDragStart(event: MouseEvent) {
    if (!isOnCueBall(event, gameContext)) {
      return;
    }
    startPoint = getCanvasCoordinates(event, gameContext);

    endPoint = startPoint;
    isDragging = true;
  }

  function handleDragMove(event: MouseEvent) {
    if (!isDragging) {
      return;
    }

    endPoint = getCanvasCoordinates(event, gameContext);
  }

  function handleDragEnd(event: MouseEvent) {
    if (!isDragging) {
      return;
    }

    endPoint = getCanvasCoordinates(event, gameContext);

    const cueBall = gameContext.state.balls.find(ball => ball.isCueBall);

    if (cueBall) {
      const dragVector: Coordinates = {
        x: endPoint.x - startPoint.x,
        y: endPoint.y - startPoint.y,
      };
      cueBall.velocity = {
        x: Math.min(dragVector.x / 100, MAX_VELOCITY),
        y: Math.min(dragVector.y / 100, MAX_VELOCITY),
      };
    }

    isDragging = false;
  }

  function renderDragLine() {
    canvasContext.beginPath();
    canvasContext.strokeStyle = 'white';
    canvasContext.moveTo(startPoint.x, startPoint.y);
    canvasContext.lineTo(endPoint.x, endPoint.y);
    canvasContext.stroke();
  }
}
