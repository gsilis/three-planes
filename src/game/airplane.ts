import { GamePieceDirection, type GamePiece } from "./game-piece";

export class Airplane implements GamePiece {
  type = 'airplane';
  direction = GamePieceDirection.NORTH;
}