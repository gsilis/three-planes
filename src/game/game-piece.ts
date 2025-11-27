import type Player from "./player";

export class GamePieceDirection {
  static NORTH = 1;
  static SOUTH = 2;
  static EAST = 3;
  static WEST = 4;
}

export interface GamePiece {
  type: string;
  direction: GamePieceDirection;
  player: Player;
  moves: number;
}