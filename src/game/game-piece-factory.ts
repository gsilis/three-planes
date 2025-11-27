import { Airplane } from "./airplane";
import { GamePieceDirection, type GamePiece } from "./game-piece";
import type Player from "./player";
import { Ship } from "./ship";
import { Submarine } from "./submarine";

export class GamePieceFactory {
  createShip(player: Player, direction: GamePieceDirection, moves = 2): Ship {
    return this.createPiece(new Ship(), player, direction, moves);
  }

  createAirplane(player: Player, direction: GamePieceDirection, moves = 5): Airplane {
    return this.createPiece(new Airplane(), player, direction, moves);
  }

  createSubmarine(player: Player, direction: GamePieceDirection, moves = 1): Submarine {
    return this.createPiece(new Submarine(), player, direction, moves);
  }

  private createPiece<T extends GamePiece>(piece: T, player: Player, direction: GamePieceDirection, moves: number): T {
    piece.player = player;
    piece.moves = moves;
    piece.direction = direction;
    return piece;
  }
}