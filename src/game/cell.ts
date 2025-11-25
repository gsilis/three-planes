import { Coordinate } from "./coordinate";
import type { GamePiece } from "./game-piece";

export class Cell {
  static create(coordinate: Coordinate) {
    return new Cell(coordinate);
  }

  private _coordinate: Coordinate;
  private _piece: GamePiece | null = null;

  constructor(coordinate: Coordinate) {
    this._coordinate = coordinate;
  }

  get piece(): GamePiece | null {
    return this._piece;
  }

  set piece(piece: GamePiece | null) {
    this._piece = piece;
  }
}