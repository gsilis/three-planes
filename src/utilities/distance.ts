import type { Coordinate } from "../game/coordinate";

export function movesBetween(point1: Coordinate, point2: Coordinate): number {
  const a = Math.abs(point1.a - point2.a);
  const b = Math.abs(point2.b - point2.b);

  return a + b;
}