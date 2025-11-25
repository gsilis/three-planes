import { createContext, useState } from "react";
import type { GamePiece } from "../game/game-piece";

type GamePieceOrNull = GamePiece | null;
type SelectedPieceContextShape = {
  piece: GamePiece | null,
  setPiece: (gamePieceOrNull: GamePieceOrNull) => void,
};

export const SelectedPieceContext = createContext<SelectedPieceContextShape>({
  piece: null,
  setPiece: () => {},
});

export function SelectedPieceContextProvider({ children }: { children: any }) {
  const [piece, setPiece] = useState<GamePieceOrNull>(null);
  const value = { piece, setPiece };

  return <SelectedPieceContext value={ value }>{ children }</SelectedPieceContext>;
}