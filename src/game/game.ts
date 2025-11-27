import { BehaviorSubject } from "rxjs";
import { Board } from "./board";
import type { Cell } from "./cell";
import { Coordinate } from "./coordinate";
import { GamePieceDirection, type GamePiece } from "./game-piece";
import { Layer } from "./layer";
import Moves from "./moves";
import type Player from "./player";
import { nextAfter } from "../utilities/array";
import { GamePieceFactory } from "./game-piece-factory";

export class GameState {
  static SETUP = 'setup';
  static STARTING = 'starting';
  static TURN = 'turn';
  static MOVING = 'moving';
  static GAME_OVER = 'game-over';

  static NULL = 'null';
}

export default class Game {
  private _size: number;
  private _boards: Board[] = [];
  private _players: Player[] = [];
  private _player?: Player;
  private _moves: Moves[] = [];
  private _state = new BehaviorSubject<GameState>(GameState.NULL);
  private pieceFactory: GamePieceFactory;

  constructor(layers: Layer[], size: number) {
    this._size = size;
    if (this._size % 2 === 0) console.warn('Use an odd number size.');
    this.setupBoards(layers);
    this._state.next(GameState.SETUP);
    this.pieceFactory = new GamePieceFactory();
  }

  get player(): Player | null {
    return this._player || null;
  }

  get players(): Player[] {
    return [...this._players];
  }

  get state() {
    return this._state;
  }

  get turnMoves() {
    return this._moves[this._moves.length - 1];
  }

  boards() {
    return [...this._boards];
  }

  cellFor(layer: Layer, a: number, b: number): Cell | null {
    const board = this.layerFor(layer);
    if (!board) return null;
    const cell = board.cellAt(Coordinate.create(a, b));
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

  addPlayer(player: Player) {
    this._players.push(player);
  }

  removePlayer(player: Player) {
    this._players = this._players.filter(p => p !== player);
  }

  start() {
    if (GameState.SETUP !== this._state.getValue()) throw new Error(`Game is in '${this._state.getValue()}', and needs to be in '${GameState.SETUP}' to start.`);
    this.setupPieces();
    this.startTurn(this._players[0]);
  }

  startTurn(player: Player) {
    this._player = player;
    this._moves.push(new Moves(this._player));
    this._state.next(GameState.TURN);
  }

  endTurn() {
    this._state.next(GameState.MOVING);
    this.startTurn(nextAfter(this._players, this._player));
  }

  private setupBoards(layers: Layer[]) {
    layers.forEach((layer: Layer) => {
      this._boards.push(new Board(layer, this._size));
    });
  }

  private setupPieces() {
    const halfSize = (this._size - 1) / 2;
    const translations = [[1, 1], [-1, -1], [1, -1] ,[-1, 1]];
    type PieceCoordinateSet = [x: number, y: number][];
    type CreatorFunction = (player: Player, direction: GamePieceDirection, moves?: number) => GamePiece;
    const ships: PieceCoordinateSet = [
      [-halfSize, -halfSize],
      [-halfSize + 1, -halfSize],
      [-halfSize, -halfSize + 1]
    ];
    const subs: PieceCoordinateSet = [
      [-halfSize + 1, -halfSize],
      [-halfSize, -halfSize + 1]
    ];
    const airplanes: PieceCoordinateSet = [
      [-halfSize, -halfSize],
      [-halfSize + 1, -halfSize],
      [-halfSize, -halfSize + 1],
      [-halfSize + 1, -halfSize + 1],
      [-halfSize + 1, -halfSize + 2],
      [-halfSize + 2, -halfSize + 1],
    ];
    const directions = [
      GamePieceDirection.SOUTH,
      GamePieceDirection.SOUTH,
      GamePieceDirection.NORTH,
      GamePieceDirection.NORTH,
    ];
    const settings: [Board | null, PieceCoordinateSet, CreatorFunction][] = [
      [this.layerFor(Layer.AIR), airplanes, this.pieceFactory.createAirplane],
      [this.layerFor(Layer.SEA), ships, this.pieceFactory.createShip],
      [this.layerFor(Layer.UNDERSEA), subs, this.pieceFactory.createSubmarine]
    ];

    this._players.forEach((player, index) => {
      const placement = index % this._players.length;
      const multipliers = translations[placement];

      settings.forEach(([board, coordinates, create]) => {
        if (!board) return;

        coordinates.forEach((coordinate) => {
          const actual = this.translatedCoordinateFor(coordinate[0], coordinate[1], multipliers[0], multipliers[1]);
          const piece = create.call(this.pieceFactory, player, directions[placement]);
          const cell = board.cellAt(actual);
          if (!cell) return;

          cell.piece = piece;
        });
      });
    });
  }

  private translatedCoordinateFor(x: number, y: number, multix: number, multiy: number): Coordinate {
    const grid = Math.round((this._size - 1) / 2);
    return Coordinate.create((x * multix) + grid, (y * multiy) + grid);
  }
}