import { useContext } from "react";
import { GameContext } from "../contexts/game-context";
import type { Layer } from "../game/layer";
import { SelectedCellContext } from "../contexts/selected-cell-context";
import { SelectedPieceContext } from "../contexts/selected-piece-context";

export function Controls() {
  const gameContext = useContext(GameContext);
  const selectedCellContext = useContext(SelectedCellContext);
  const selectedPieceContext = useContext(SelectedPieceContext);
  const setLayer = (layer: Layer) => {
    gameContext.setLayer(layer);
    selectedCellContext.setCell(null);
    selectedPieceContext.setPiece(null);
  };

  return <div>
    <section className="flex flex-col">
      <h1>Layer</h1>
      { gameContext.game.boards().map((board) => {
        return <button onClick={ () => setLayer(board.layer) } key={ `${board.layer}` }>
          { gameContext.board === board ? `> ${board.layer}` : `${board.layer}` }
        </button>
      }) }
    </section>
    <section className="flex flex-col">
      <h1>Piece</h1>
      { !selectedPieceContext.piece && <p>No piece selected</p> }
      { selectedPieceContext.piece && <p>Selected Piece!</p> }
    </section>
  </div>;
}