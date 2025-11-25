import { useContext } from "react";
import type { Cell as CellData } from "../game/cell";
import { SelectedCellContext } from "../contexts/selected-cell-context";
import { SelectedPieceContext } from "../contexts/selected-piece-context";
import { Piece } from "./Piece";
import type { GamePiece } from "../game/game-piece";

type CellShape = {
  cell: CellData,
  col: string,
  row: string,
};

export function Cell({
  cell,
  col,
  row,
}: CellShape) {
  const selectedCellContext = useContext(SelectedCellContext);
  const selectedPieceContext = useContext(SelectedPieceContext);
  const isSelected = cell === selectedCellContext.cell;
  const hasPiece = !!cell.piece;

  const classes = [
    'p-2',
    'm-1',
    'bg-slate-200',
    'text-center',
    'cursor-pointer',
    'grid',
    'grid-rows-3',
    'grid-cols-3',
    'w-[60px]',
    'h-[60px]',
    'border-slate-300',
    'border-1',
    isSelected ? 'bg-slate-400' : '',
    isSelected ? 'hover:bg-slate-500' : 'hover:bg-slate-300',
    col,
    row
  ];
  const cellClasses = [
    'col-2',
    'row-2',
  ];
  const onClick = () => {
    selectedCellContext.setCell(cell);
    if (cell.piece) selectedPieceContext.setPiece(cell.piece);
  };

  return <div className={ classes.join(' ') } onClick={ onClick }>
    <div className={ cellClasses.join(' ') }>
      { hasPiece ? <Piece piece={ cell.piece as GamePiece } /> : '' }
    </div>
  </div>;
}