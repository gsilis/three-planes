import { useContext } from "react";
import type { Cell as CellData } from "../game/cell";
import { SelectedCellContext } from "../contexts/selected-cell-context";
import { SelectedPieceContext } from "../contexts/selected-piece-context";
import { Piece } from "./Piece";
import type { GamePiece } from "../game/game-piece";
import { GameContext } from "../contexts/game-context";
import { MoveContext } from "../contexts/move-context";
import { withinRange } from "../utilities/distance";

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
  const gameContext = useContext(GameContext);
  const selectedCellContext = useContext(SelectedCellContext);
  const selectedPieceContext = useContext(SelectedPieceContext);
  const moveContext = useContext(MoveContext);
  const isSelected = cell === selectedCellContext.cell;
  const piece = cell.piece;
  const hasPiece = !!piece;
  const playerPiece = hasPiece && piece.player === gameContext.player;
  const fromPoint = moveContext.fromPoint;
  const isMoving = fromPoint !== null;
  const isAvailable = isMoving && withinRange(fromPoint, cell.coordinate, moveContext.moves);

  const classes = [
    'p-2',
    'm-1',
    'text-center',
    'cursor-pointer',
    'grid',
    'grid-rows-3',
    'grid-cols-3',
    'w-[60px]',
    'h-[60px]',
    'border-slate-300',
    'border-1',
    playerPiece ? 'text-emerald-600 font-bold' : 'text-black/40',
    isSelected ? 'bg-slate-400' : isAvailable ? 'bg-emerald-300' : 'bg-slate-200',
    isSelected ? 'hover:bg-slate-500' : 'hover:bg-slate-300',
    isAvailable ? 'bg-emerald-300' : '',
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

  if (isAvailable) {
    console.log(`(${cell.coordinate.a}, ${cell.coordinate.b})`);
  }

  return <div className={ classes.join(' ') } onClick={ onClick }>
    <div className={ cellClasses.join(' ') }>
      { hasPiece ? <Piece piece={ cell.piece as GamePiece } /> : '' }
      { isAvailable && 'A' }
    </div>
  </div>;
}