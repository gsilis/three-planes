export function fill<T>(size: number, fill: T): T[] {
  const a: T[] = [];

  for (let i = 0; i < size; i++) {
    a.push(fill);
  }

  return a;
}

export function nextAfter(arr: any[], item: any): any {
  const index = arr.indexOf(item);
  const next = arr[index + 1];

  if (next) {
    return next;
  } else {
    return arr[0];
  }
}

export function createMatrix(size: number): number[][] {
  const arr: number[][] = [];

  for (let x = 0; x < size; x++) {
    const row: number[] = [];
    arr.push(row);

    for (let y = 0; y < size; y++) {
      row.push(0);
    }
  }

  return arr;
}

export function maxFrom(arr: number[]): number {
  return arr.reduce((running, num) => {
    return Math.max(running, num);
  }, 0);
}