export class Coordinate {
  static create(a: number, b: number) {
    return new Coordinate(a, b);
  }

  private _a: number = -1;
  private _b: number = -1;

  constructor(a: number, b: number) {
    this._a = a;
    this._b = b;
  }

  get a(): number {
    return this._a;
  }

  get b(): number {
    return this._b;
  }
}