import { GamePieceDirection, type GamePiece } from "./game-piece";
import Player from "./player";

export class Airplane implements GamePiece {
  constructor(id: number) {
    this.id = id;
  }

  id = -1;
  type = 'airplane';
  direction = GamePieceDirection.NORTH;
  player = Player.create('Null');
  moves = 4;
}