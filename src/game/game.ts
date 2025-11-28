import { Board } from "./board";
import { BoardFactory } from "./board-factory";
import { BoardType } from "./board-type";
import type { Coordinate } from "./coordinate";
import type { GamePiece } from "./game-piece";
import { Layer } from "./layer";
import type Player from "./player";
import type PlayerManager from "./player-manager";
import { Turn } from "./turn";

type BoardSet = Record<string, Board>;

export class Game {
  private _boardSize: number;
  private _boardFactory: BoardFactory;
  private _boards: BoardSet[] = [];
  private _select: Board;
  private _hover: Board;
  private _moves: Board;
  private _pieces: GamePiece[] = [];
  private _players: PlayerManager;
  private _turns: Turn[] = [];

  constructor(boardSize: number, players: PlayerManager) {
    this._boardSize = boardSize;
    this._players = players;

    this._boardFactory = new BoardFactory(this._boardSize);

    this._select = this._boardFactory.create(BoardType.SELECT);
    this._hover = this._boardFactory.create(BoardType.HOVER);
    this._moves = this._boardFactory.create(BoardType.MOVES);

    this._players.all().forEach(() => {
      this._boards.push({
        [Layer.AIR]: this._boardFactory.create(BoardType.PIECES),
        [Layer.SEA]: this._boardFactory.create(BoardType.PIECES),
        [Layer.UNDERSEA]: this._boardFactory.create(BoardType.PIECES),
      });
    });
  }

  startTurn(player: Player) {
    this._moves.wipe();
    this._select.wipe();
    this._turns.push(new Turn(player));
  }

  endTurn() {
    console.log('End Turn');
  }

  select(coordinate?: Coordinate) {
    this._select.wipe();
    if (coordinate) this._select.setValueFor(coordinate, 1);
  }

  hover(coordinate?: Coordinate) {
    this._hover.wipe();
    if (coordinate) this._hover.setValueFor(coordinate, 1);
  }

  addPiece(player: Player, piece: GamePiece, boardName: string, coordinate: Coordinate) {
    const board = this.playerAndBoardFor(player, boardName);
    if (!board) return;

    board.setValueFor(coordinate, piece.id);
    this._pieces.push(piece);
  }

  movePiece(player: Player, piece: GamePiece, boardName: string, toCoordinate: Coordinate): GamePiece | void {
    const board = this.playerAndBoardFor(player, boardName);
    if (!board) return;

    const fromCoordinate = board.coordinateFor(piece.id);
    const oldId = board.move(fromCoordinate, toCoordinate);
    const oldPiece = this._pieces.find(p => p.id === oldId);

    return oldPiece;
  }

  boardsFor(player: Player): BoardSet | void {
    const position = this._players.positionFor(player);
    return this._boards[position];
  }

  hoverBoard(): Board {
    return this._hover;
  }

  selectBoard(): Board {
    return this._select;
  }

  moveBoard(): Board {
    return this._moves;
  }

  private playerAndBoardFor(player: Player, boardName: string): Board | void {
    const index = this._players.positionFor(player);
    if (index < 0) return;
    const board = this._boards[index][boardName];

    return board;
  }
}