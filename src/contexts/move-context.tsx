import { createContext, useState } from "react";
import type { Coordinate } from "../game/coordinate";
import { withinRange } from "../utilities/distance";
import type { GamePiece } from "../game/game-piece";

type MoveContextShape = {
  piece: GamePiece | null,
  fromPoint: Coordinate | null,
  moves: number,
  setPoint: (point: Coordinate, piece: GamePiece) => void,
  clearPoint: () => void,
  toPoint: Coordinate | null,
  setToPoint: (point: Coordinate | null) => void,
  canMove: boolean,
  hoverPoint: Coordinate | null,
  setHoverPoint: (point: Coordinate | null) => {},
};

export const MoveContext = createContext<MoveContextShape>({
  piece: null,
  fromPoint: null,
  moves: 0,
  setPoint: () => {},
  toPoint: null,
  setToPoint: () => {},
  clearPoint: () => {},
  canMove: false,
  hoverPoint: null,
  setHoverPoint: () => {},
});

export function MoveContextProvider({ children }: { children: any }) {
  const [piece, setPiece] = useState<GamePiece | null>(null);
  const [fromPoint, setFromPoint] = useState<Coordinate | null>(null);
  const [toPoint, setToPoint] = useState<Coordinate | null>(null);
  const [moves, setMoves] = useState<number>(0);

  const setPoint = (point: Coordinate, piece: GamePiece) => {
    setPiece(piece);
    setMoves(piece.moves);
    setFromPoint(point);
  };
  const clearPoint = () => {
    setPiece(null);
    setMoves(0);
    setFromPoint(null);
  };
  const canMove = fromPoint && toPoint && withinRange(fromPoint, toPoint, moves) || false;

  const value = {
    fromPoint,
    toPoint,
    setToPoint,
    canMove,
    moves,
    setPoint,
    clearPoint,
    piece,
  };

  return <MoveContext value={ value }>{ children }</MoveContext>;
}