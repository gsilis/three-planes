import { createContext, useMemo, useState } from "react"
import Game from "../game/game"
import { Layer } from "../game/layer"
import { Board } from "../game/board"
import { Ship } from "../game/ship"
import { Airplane } from "../game/airplane"
import { Submarine } from "../game/submarine"

type GameContextShape = {
  game: Game,
  layer: Layer,
  setLayer: (layer: Layer) => void,
  board: Board,
}

const BOARD_SIZE = 10;
const BOARDS = [Layer.AIR, Layer.SEA, Layer.UNDERSEA];
const nullBoard = new Board(Layer.NONE, 0);

export const GameContext = createContext<GameContextShape>({
  game: new Game([], 0),
  layer: Layer.SEA,
  setLayer: () => {},
  board: nullBoard,
});

export function GameContextProvider({ children }: { children: any }) {
  const [layer, setLayer] = useState<Layer>(Layer.SEA);
  const game = useMemo(() => {
    const g = new Game(BOARDS, BOARD_SIZE);
    const cell = g.cellFor(Layer.SEA, 2, 4);
    const cell2 = g.cellFor(Layer.AIR, 1, 5);
    const cell3 = g.cellFor(Layer.UNDERSEA, 5, 6);
    const cell4 = g.cellFor(Layer.UNDERSEA, 3, 9);
    if (cell) cell.piece = new Ship();
    if (cell2) cell2.piece = new Airplane();
    if (cell3) cell3.piece = new Submarine();
    if (cell4) cell4.piece = new Submarine(); 
    return g;
  }, []);
  const value = {
    layer,
    setLayer,
    game,
    board: game.layerFor(layer) || nullBoard,
  };

  return <GameContext value={ value }>{ children }</GameContext>;
}