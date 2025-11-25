import { GamePieceDirection, type GamePiece } from "./game-piece";

export class Ship implements GamePiece {
  type = 'ship';
  direction = GamePieceDirection.NORTH;
}