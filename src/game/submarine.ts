import { GamePieceDirection, type GamePiece } from "./game-piece";

export class Submarine implements GamePiece {
  type = 'submarine';
  direction = GamePieceDirection.NORTH;
}