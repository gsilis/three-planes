import { Board } from "./board";
import type { BoardType } from "./board-type";

export class BoardFactory {
  private _size: number;

  constructor(size: number) {
    this._size = size;
  }

  create(name: BoardType) {
    return new Board(name, this._size);
  }
}