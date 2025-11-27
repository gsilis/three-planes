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