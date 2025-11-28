import { GamePieceDirection, type GamePiece } from "./game-piece";
import Player from "./player";

export class Ship implements GamePiece {
  constructor(id: number) {
    this.id = id;
  }

  id = -1;
  type = 'ship';
  direction = GamePieceDirection.NORTH;
  player = Player.create('Null');
  moves = 3;
}