import { createContext, useState } from "react";
import type { Coordinate } from "../game/coordinate";

type MoveContextShape = {
  fromPoint: Coordinate | null,
  moves: number,
  setPoint: (point: Coordinate, moves: number) => void,
  clearPoint: () => void,
};

export const MoveContext = createContext<MoveContextShape>({
  fromPoint: null,
  moves: 0,
  setPoint: () => {},
  clearPoint: () => {}
});

export function MoveContextProvider({ children }: { children: any }) {
  const [fromPoint, setFromPoint] = useState<Coordinate | null>(null);
  const [moves, setMoves] = useState<number>(0);

  const setPoint = (point: Coordinate, moves: number) => {
    setMoves(moves);
    setFromPoint(point);
  };
  const clearPoint = () => {
    setMoves(0);
    setFromPoint(null);
  };

  const value = {
    fromPoint,
    moves,
    setPoint,
    clearPoint,
  };

  return <MoveContext value={ value }>{ children }</MoveContext>;
}