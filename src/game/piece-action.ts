import type { GamePiece } from "./game-piece";

export interface PieceAction {
  get type(): string;
  get piece(): GamePiece;
  get distance(): number;
  applyToPiece(): void;
}