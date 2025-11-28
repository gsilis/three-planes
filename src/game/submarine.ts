import { GamePieceDirection, type GamePiece } from "./game-piece";
import Player from "./player";

export class Submarine implements GamePiece {
  constructor(id: number) {
    this.id = id;
  }

  id = -1;
  type = 'submarine';
  direction = GamePieceDirection.NORTH;
  player = Player.create('Null');
  moves = 3;
}