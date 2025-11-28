import { useContext } from "react";
import { GameContext } from "../contexts/game-context";
import { SelectedPieceContext } from "../contexts/selected-piece-context";
import { SelectedCellContext } from "../contexts/selected-cell-context";
import { MoveContext } from "../contexts/move-context";

export function SelectedPiece() {
  const gameContext = useContext(GameContext);
  const selectedPieceContext = useContext(SelectedPieceContext);
  const selectedCellContext = useContext(SelectedCellContext);
  const moveContext = useContext(MoveContext);

  const piece = selectedPieceContext.piece;
  const cell = selectedCellContext.cell;
  const coordinate = cell?.coordinate;
  const moves = gameContext.moves;
  const pieceMoves = piece ? moves.movesFor(piece) : [];
  const hasMoves = pieceMoves.length > 0;
  const remainingMoves = pieceMoves.reduce((sum, m) => sum - m.distance, piece?.moves || 0);
  const isPlayerPiece = piece && gameContext.player === piece.player;
  const isMoving = moveContext.fromPoint !== null;
  const canMove = piece?.player === gameContext.player;

  const onMove = () => {
    if (!coordinate || !piece) return;

    moveContext.setPoint(coordinate, piece);
  };
  const onCancel = () => {
    moveContext.clearPoint();
  };
  const onSet = () => {
    if (!moveContext.piece || !gameContext.board || !moveContext.toPoint) return;

    gameContext.moves.movePiece(moveContext.piece, gameContext.board, moveContext.toPoint);
  };

  return <div>
    <h1 className="capitalize">{ piece?.type }</h1>
    <p>Location: ({ cell?.coordinate.a }, { cell?.coordinate.b })</p>
    <p>Moves Left: { remainingMoves }</p>
    <h2 className="text-lg">Actions</h2>
    <div className="flex flex-col">
      { pieceMoves.map((move) => {
        return <p>{ move.type } - { move.distance }moves</p>;
      }) }
      { !hasMoves && !isMoving && canMove && <button className="bg-emerald-500 text-white cursor-pointer" onClick={ onMove }>Move Piece</button> }
      { !hasMoves && isMoving && canMove && <button className="bg-emerald-500 text-white cursor-pointer disabled:opacity-30" onClick={ onSet } disabled={ !moveContext.canMove }>Set</button> }
      { !hasMoves && isMoving && <button className="bg-emerald-500 text-white cursor-pointer" onClick={ onCancel }>Cancel</button> }
    </div>
  </div>;
}