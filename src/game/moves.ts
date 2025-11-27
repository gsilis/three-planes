import type { Board } from "./board";
import type { Coordinate } from "./coordinate";
import type { GamePiece } from "./game-piece";
import MoveAction from "./move-action";
import type { PieceAction } from "./piece-action";
import type Player from "./player";

export default class Moves {
  private _moves: PieceAction[] = [];
  private _player: Player;

  constructor(player: Player) {
    this._player = player;
  }

  get player(): Player {
    return this._player;
  }

  movePiece(piece: GamePiece, board: Board, to: Coordinate) {
    const cell = board.cellFor(piece);
    if (!cell) throw new Error('Piece is not on the board.');

    const from = cell.coordinate;
    const move = new MoveAction(piece, board, from, to);
    const distance = this.movesFor(piece).reduce((sum, m) => sum + m.distance, move.distance);
    if (distance > piece.moves) return;

    this._moves.push(move);
  }

  movesFor(piece: GamePiece): PieceAction[] {
    return this._moves.filter(m => m.piece === piece);
  }
}