import { Coordinate } from "../coordinate";
import type { Game } from "../game";
import { GamePieceDirection } from "../game-piece";
import type { GamePieceFactory } from "../game-piece-factory";
import { Layer } from "../layer";
import type PlayerManager from "../player-manager";
import type { GameSetup } from "./game-setup";

const multipliers = [
  [1, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
];
const directions = [
  GamePieceDirection.SOUTH,
  GamePieceDirection.NORTH,
  GamePieceDirection.SOUTH,
  GamePieceDirection.NORTH,
];

export class SimpleGame implements GameSetup {
  setup(game: Game, players: PlayerManager, factory: GamePieceFactory): void {
    const size = game.boardSize - 1;
    const ships: [number, number][] = [
      [0, 0],
      [1, 0],
      [0, 1],
    ];
    const subs: [number, number][] = [
      [0, 0],
      [1, 0],
      [0, 1],
    ];
    const air: [number, number][] = [
      [1, 1],
      [1, 2],
      [2, 1],
      [2, 2],
      [2, 3],
      [3, 2],
    ];

    players.all().forEach((player, index) => {
      const boardSet = game.boardsFor(player);
      const m = multipliers[index];
      const d = directions[index];
      if (!boardSet) return;

      ships.forEach((coordinate) => {
        const point = Coordinate.create(coordinate[0] * m[0], coordinate[1] * m[1]);
        const piece = factory.createShip(player, d);

        game.addPiece(player, piece, Layer.SEA, point);
      });

      air.forEach((coordinate) => {
        const point = Coordinate.create(coordinate[0] * m[0], coordinate[1] * m[1]);
        const piece = factory.createAirplane(player, d);

        game.addPiece(player, piece, Layer.AIR, point);
      });

      subs.forEach((coordinate) => {
        const point = Coordinate.create(coordinate[0] * m[0], coordinate[1] * m[1]);
        const piece = factory.createSubmarine(player, d);

        game.addPiece(player, piece, Layer.UNDERSEA, point);
      });
    });
  }
}