import { createMatrix } from "../utilities/array";
import { BoardType } from "./board-type";
import { Coordinate } from "./coordinate";

export class Board {
  private _name: BoardType = BoardType.NULL;
  private _boardSize: number;
  private _cells: number[][] = [];

  constructor(name: BoardType, boardSize: number) {
    this._name = name;
    this._boardSize = boardSize;
    this._cells = createMatrix(this._boardSize);
  }

  get name(): BoardType {
    return this._name;
  }

  coordinateFor(value: number): Coordinate {
    let a = -1, b = -1;

    this._cells.forEach((row, possibleA) => {
      row.forEach((possibleValue, possibleB) => {
        if (possibleValue === value) {
          a = possibleA;
          b = possibleB;
        }
      });
    });

    return Coordinate.create(a, b);
  }

  valueFor(coordinate: Coordinate): number {
    const row = this._cells[coordinate.a] || [];
    const cell = row[coordinate.b] || -1;

    return cell;
  }

  setValueFor(coordinate: Coordinate, value: number): number {
    let oldValue = -1;

    try {
      oldValue = this._cells[coordinate.a][coordinate.b];
      this._cells[coordinate.a][coordinate.b] = value;
    } catch(e) {}

    return oldValue;
  }

  move(from: Coordinate, to: Coordinate): number {
    const oldValue = this.setValueFor(from, 0);
    return this.setValueFor(to, oldValue);
  }

  wipe() {
    const size = this._boardSize;

    this._cells.forEach((row) => {
      for (let x = 0; x < size; x++) {
        row[x] = 0;
      }
    });
  }
}