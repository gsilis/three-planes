import { GamePieceDirection, type GamePiece } from "./game-piece";
import Player from "./player";

export class Airplane implements GamePiece {
  type = 'airplane';
  direction = GamePieceDirection.NORTH;
  player = Player.create('Null');
  moves = 4;
}