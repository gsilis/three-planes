import { createContext, useState } from "react";
import type { Cell } from "../game/cell";

type CellOrNull = Cell | null;
type SelectedCellContextShape = {
  cell: CellOrNull,
  setCell: (cellOrNull: CellOrNull) => void,
};

export const SelectedCellContext = createContext<SelectedCellContextShape>({
  cell: null,
  setCell: () => {},
});

export function SelectedCellContextProvider({ children }: { children: any }) {
  const [cell, setCell] = useState<CellOrNull>(null);
  const value = { cell, setCell };

  return <SelectedCellContext value={ value }>{ children }</SelectedCellContext>;
}