import Moves from "./moves";
import type Player from "./player";

export class Turn {
  private _player: Player;
  private _moves: Moves;

  constructor(player: Player, moves = new Moves()) {
    this._player = player;
    this._moves = moves;
  }

  get player(): Player {
    return this._player;
  }
}