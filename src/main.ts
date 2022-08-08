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
}

run();

export {};