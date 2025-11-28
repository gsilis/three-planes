import { useContext } from "react";
import { GameContext } from "../contexts/game-context";
import type { Layer } from "../game/layer";
import { SelectedCellContext } from "../contexts/selected-cell-context";
import { SelectedPieceContext } from "../contexts/selected-piece-context";
import { Setup } from "./Setup";
import { GameState } from "../game/game";
import { SelectedPiece } from "./SelectedPiece";
import { MoveContext } from "../contexts/move-context";

export function Controls() {
  const gameContext = useContext(GameContext);
  const selectedCellContext = useContext(SelectedCellContext);
  const selectedPieceContext = useContext(SelectedPieceContext);
  const moveContext = useContext(MoveContext);
  const setLayer = (layer: Layer) => {
    gameContext.setLayer(layer);
    selectedCellContext.setCell(null);
    selectedPieceContext.setPiece(null);
    moveContext.clearPoint();
  };
  const isSetup = GameState.SETUP === gameContext.state;
  const isMoving = GameState.MOVING === gameContext.state;
  const isTurn = GameState.TURN === gameContext.state;

  return <div className="mx-1">
    { isSetup && <Setup /> }
    { isTurn && <section className="flex flex-col gap-2">
      <h1>Layer</h1>
      { gameContext.game.boards().map((board) => {
        const classes = [
          'rounded-md',
          'text-white',
          'cursor-pointer',
        ];
        if (board === gameContext.board) {
          classes.push('bg-sky-700', 'hover:bg-sky-800');
        } else {
          classes.push('bg-sky-600', 'hover:bg-sky-700');
        }
        return <button className={ classes.join(' ') } onClick={ () => setLayer(board.layer) } key={ `${board.layer}` }>
          { `${board.layer}` }
        </button>
      }) }
    </section> }
    { isTurn && <section className="flex flex-col my-2">
      <h1>Piece</h1>
      { !selectedPieceContext.piece && <p>No piece selected</p> }
      { selectedPieceContext.piece && <SelectedPiece /> }
    </section> }
    { isMoving && <p>Moving...</p> }
  </div>;
}