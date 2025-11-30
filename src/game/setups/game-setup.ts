import type { Game } from "../game";
import type { GamePieceFactory } from "../game-piece-factory";
import type PlayerManager from "../player-manager";

export interface GameSetup {
  setup(game: Game, players: PlayerManager, factory: GamePieceFactory): void;
}