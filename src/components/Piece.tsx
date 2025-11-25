import type { GamePiece } from "../game/game-piece";

type PieceShape = {
  piece: GamePiece,
};

export function Piece({
  piece
}: PieceShape) {
  return piece.type[0];
}