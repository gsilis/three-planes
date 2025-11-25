import { Board } from "./board";
import type { Cell } from "./cell";
import type { GamePiece } from "./game-piece";
import type { Layer } from "./layer";

export default class Game {
  private _size: number;
  private _boards: Board[] = [];

  constructor(layers: Layer[], size: number) {
    this._size = size;
    this.setupBoards(layers);
  }

  boards() {
    return [...this._boards];
  }

  cellFor(layer: Layer, a: number, b: number): Cell | null {
    const board = this.layerFor(layer);
    if (!board) return null;

    const cell = board.cellFor(a, b);
    return cell;
  }

  layerFor(layer: Layer): Board | null {
    return this._boards.find(b => b.layer === layer) || null;
  }

  pieceFor(layer: Layer, a: number, b: number): GamePiece | null {
    const cell = this.cellFor(layer, a, b);
    if (!cell) return null;

    return cell.piece;
  }

  private setupBoards(layers: Layer[]) {
    layers.forEach((layer: Layer) => {
      this._boards.push(new Board(layer, this._size));
    });
  }
}