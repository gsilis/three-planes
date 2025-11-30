import { BehaviorSubject } from "rxjs";
import { Board } from "./board";
import { BoardFactory } from "./board-factory";
import { BoardType } from "./board-type";
import type { Coordinate } from "./coordinate";
import type { GamePiece } from "./game-piece";
import { GameState } from "./game-state";
import { Layer } from "./layer";
import type Player from "./player";
import type PlayerManager from "./player-manager";
import { Turn } from "./turn";

type BoardSet = Record<string, Board>;

export class Game {
  private _state: BehaviorSubject<GameState>;
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
    this._state = new BehaviorSubject<GameState>(GameState.SETUP);
    this._boardSize = boardSize;
    this._players = players;

    this._boardFactory = new BoardFactory(this._boardSize);

    this._select = this._boardFactory.create(BoardType.SELECT);
    this._hover = this._boardFactory.create(BoardType.HOVER);
    this._moves = this._boardFactory.create(BoardType.MOVES);
  }

  setup() {
    this._players.all().forEach(() => {
      this._boards.push({
        [Layer.AIR]: this._boardFactory.create(BoardType.PIECES),
        [Layer.SEA]: this._boardFactory.create(BoardType.PIECES),
        [Layer.UNDERSEA]: this._boardFactory.create(BoardType.PIECES),
      });
    });

    this._state.next(GameState.READY);
  }

  get boardSize(): number {
    return this._boardSize;
  }

  startTurn(player: Player): Turn {
    this._moves.wipe();
    this._select.wipe();

    const boards = Object.values(this.boardsFor(player) || {});
    const turn = new Turn(player, boards);
    this._turns.push(turn);
    this._state.next(GameState.TURN);

    return turn;
  }

  endTurn() {
    console.log('End Turn');
  }

  addPiece(player: Player, piece: GamePiece, boardName: string, coordinate: Coordinate) {
    const board = this.playerAndBoardFor(player, boardName);
    if (!board) return;

    board.setValueFor(coordinate, piece.id);
    this._pieces.push(piece);
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

  state() {
    return this._state;
  }

  private playerAndBoardFor(player: Player, boardName: string): Board | void {
    const index = this._players.positionFor(player);
    if (index < 0) return;
    const board = this._boards[index][boardName];

    return board;
  }
}