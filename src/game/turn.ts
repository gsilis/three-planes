import type { Board } from "./board";
import type { Coordinate } from "./coordinate";
import type { GamePiece } from "./game-piece";
import Moves from "./moves";
import type Player from "./player";

export class Turn {
  private _player: Player;
  private _boards: Board[];
  private _moves: Moves;

  constructor(player: Player, boards: Board[], moves = new Moves()) {
    this._player = player;
    this._boards = boards;
    this._moves = moves;
  }

  get player(): Player {
    return this._player;
  }
}