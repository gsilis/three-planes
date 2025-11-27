import { movesBetween } from "../utilities/distance";
import type { Board } from "./board";
import type { Coordinate } from "./coordinate";
import type { GamePiece } from "./game-piece";
import type { PieceAction } from "./piece-action";

export default class MoveAction implements PieceAction {
  private _piece: GamePiece;
  private _board: Board;
  private _from: Coordinate;
  private _to: Coordinate;
  private _distance: number;
  private _applied: boolean = false;

  constructor(piece: GamePiece, board: Board, from: Coordinate, to: Coordinate) {
    this._piece = piece;
    this._board = board;
    this._from = from;
    this._to = to;
    this._distance = movesBetween(this._from, this._to);
  }

  get piece(): GamePiece {
    return this._piece;
  }

  get type(): string {
    return 'move';
  }

  get distance(): number {
    return this._distance;
  }

  applyToPiece(): void {
    if (this._applied) return;

    const fromCell = this._board.cellAt(this._from);
    const toCell = this._board.cellAt(this._to);
    if (!toCell) throw new Error('Destination cell not found.');
    this._applied = true;
    toCell.piece = this._piece;
    
    if (fromCell?.piece === this.piece) {
      fromCell.piece = null;
    }
  }
}