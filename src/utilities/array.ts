export function fill<T>(size: number, fill: T): T[] {
  const a: T[] = [];

  for (let i = 0; i < size; i++) {
    a.push(fill);
  }

  return a;
}