import { Cell } from "./cell";
import { Coordinate } from "./coordinate";
import type { GamePiece } from "./game-piece";
import type { Layer } from "./layer";

export class Board {
  private _layer: Layer;
  private _cells: Cell[][] = [];
  private _cachedCells: [Cell, number, number][] = [];
  private _size: number;

  constructor(layer: Layer, size: number) {
    this._layer = layer;
    this._size = size;
    this._cells = [];
    this.setupCells();
  }

  get layer(): Layer {
    return this._layer;
  }

  get size(): number {
    return this._size;
  }

  cellAt(coordinate: Coordinate): Cell | null
  cellAt(a: Coordinate | number, b?: number): Cell | null {
    if (typeof a === 'object') {
      b = a.b;
      a = a.a;
    } else if (b === undefined) {
      throw new Error(`If passing coordinates indivudually, 'b' parameter must be defined.`);
    }

    const row = this._cells[a] || [];
    const cell = row[b];

    return cell || null;
  }

  cellFor(piece: GamePiece): Cell | null {
    const config = this.cells().find(c => c[0]?.piece === piece) || null;
    return config && config[0];
  }

  cells(): [Cell, number, number][] {
    return [...this._cachedCells];
  }

  private setupCells() {
    for (let a = 0; a < this._size; a++) {
      this._cells[a] = [];

      for (let b = 0; b < this._size; b++) {
        const cell = Cell.create(Coordinate.create(a, b));

        this._cells[a].push(cell);
        this._cachedCells.push([cell, a, b]);
      }
    }
  }
}