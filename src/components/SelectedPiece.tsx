import { useContext } from "react";
import { GameContext } from "../contexts/game-context";
import { SelectedPieceContext } from "../contexts/selected-piece-context";
import { SelectedCellContext } from "../contexts/selected-cell-context";

export function SelectedPiece() {
  const gameContext = useContext(GameContext);
  const selectedPieceContext = useContext(SelectedPieceContext);
  const selectedCellContext = useContext(SelectedCellContext);
  const piece = selectedPieceContext.piece;
  const cell = selectedCellContext.cell;
  const moves = gameContext.moves;
  const pieceMoves = piece ? moves.movesFor(piece) : [];
  const hasMoves = pieceMoves.length > 0;

  return <div>
    <h1>{ piece?.type }</h1>
    <p>({ cell?.coordinate.a }, { cell?.coordinate.b })</p>
    <h2>Actions</h2>
    <div className="flex flex-col">
      { pieceMoves.map((move) => {
        return <p>{ move.type } - { move.distance }moves</p>;
      }) }
      { hasMoves && <p>No moves for this piece.</p> }
    </div>
  </div>;
}