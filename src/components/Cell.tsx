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
  const isStartingPoint = moveContext.fromPoint?.equals(cell.coordinate) || false;

  let bg = 'bg-slate-200';
  let bgHover = 'hover:bg-slate-300';
  let textColor = 'text-slate-500/50';

  if (isSelected) {
    if (isStartingPoint) {
      bg = 'bg-yellow-400';
      bgHover = 'bg-yellow-500';
    } else if (isAvailable) {
      bg = 'bg-emerald-300';
      bgHover = 'hover:bg-emerald-400';
    } else {
      bg = 'bg-slate-400';
      bgHover = 'hover:bg-slate-500';
    }
  } else {
    if (isStartingPoint) {
      bg = 'bg-yelloe-300';
      bgHover = 'bg-yellow-400';
    } if (isAvailable) {
      bg = 'bg-emerald-200';
      bgHover = 'bg-emerald-400';
    }
  }

  if (playerPiece) {
    if (isStartingPoint && isSelected) textColor = 'text-red-300';
    else textColor = 'text-red-400';
  } else {
  }

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
    bg,
    bgHover,
    textColor,
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
    </div>
  </div>;
}