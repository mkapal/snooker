import { Coordinates, StepParams } from '../../types';
import { getCanvasCoordinates } from '../../render';
import { dispatch } from '../../gameState';
import { setBallVelocity } from '../../gameState/actions';
import { MAX_VELOCITY } from '../constants';
import { isOnCueBall } from '../helpers';

let startPoint: Coordinates = { x: 0, y: 0 };
let endPoint: Coordinates = { x: 0, y: 0 };
let isDragging = false;

export function handleCueDrag({ gameContext, canvasContext }: StepParams) {
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
      dispatch(
        setBallVelocity(cueBall.id, {
          x: Math.min((endPoint.x - startPoint.x) / 100, MAX_VELOCITY),
          y: Math.min((endPoint.y - startPoint.y) / 100, MAX_VELOCITY),
        }),
      );
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
