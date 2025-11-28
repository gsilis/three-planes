import type Player from "./player";

export default class PlayerManager {
  private _current: number = -1;
  private _players: Player[] = [];

  get current(): Player {
    return this._players[this._current];
  }

  all() {
    return [...this._players];
  }

  positionFor(player: Player): number {
    return this._players.indexOf(player);
  }

  add(player: Player) {
    this._players.push(player);
  }

  remove(player: Player) {
    this._players = this._players.filter(p => p !== player);
  }

  next(): Player {
    this._current += 1;
    if (!this.current) this._current = 0;
    return this.current;
  }
}