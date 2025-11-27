import { GamePieceDirection, type GamePiece } from "./game-piece";
import Player from "./player";

export class Ship implements GamePiece {
  type = 'ship';
  direction = GamePieceDirection.NORTH;
  player = Player.create('Null');
  moves = 3;
}