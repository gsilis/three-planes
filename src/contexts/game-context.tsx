import { createContext, useEffect, useMemo, useState } from "react"
import Game, { GameState } from "../game/game"
import { Layer } from "../game/layer"
import { Board } from "../game/board"
import Player from "../game/player"
import Moves from "../game/moves"

type GameContextShape = {
  game: Game,
  layer: Layer,
  setLayer: (layer: Layer) => void,
  board: Board,
  player: Player | null,
  players: Player[],
  moves: Moves,
  endTurn: () => void,
  addPlayer: (player: Player) => void,
  removePlayer: (player: Player) => void,
  state: GameState,
  start: () => void,
}

const BOARD_SIZE = 10;
const BOARDS = [Layer.AIR, Layer.SEA, Layer.UNDERSEA];
const nullBoard = new Board(Layer.NONE, 0);
const nullPlayer = Player.create('NULL');
const nullMoves = new Moves(nullPlayer);

export const GameContext = createContext<GameContextShape>({
  game: new Game([], 0),
  layer: Layer.SEA,
  setLayer: () => {},
  board: nullBoard,
  player: null,
  players: [],
  moves: nullMoves,
  endTurn: () => {},
  addPlayer: () => {},
  removePlayer: () => {},
  state: GameState.NULL,
  start: () => {},
});

export function GameContextProvider({ children }: { children: any }) {
  const [layer, setLayer] = useState<Layer>(Layer.SEA);
  const [players, setPlayers] = useState<Player[]>([]);
  const [player, setPlayer] = useState<Player | null>(null);
  const [gameState, setGameState] = useState<GameState>(GameState.NULL);
  const [moves, setMoves] = useState<Moves>(nullMoves);
  const game = useMemo(() => {
    return new Game(BOARDS, BOARD_SIZE);
  }, []);
  const addPlayer = (player: Player) => {
    game.addPlayer(player);
    setPlayers(game.players);
  };
  const removePlayer = (player: Player) => {
    game.removePlayer(player);
    setPlayers(game.players);
  };
  const endTurn = () => {
    game.endTurn();
    setPlayer(game.player);
  };
  const start = () => {
    game.start();
  };

  useEffect(() => {
    const sub = game.state.subscribe((newState) => {
      setGameState(newState);
      setPlayer(game.player);
      setMoves(game.turnMoves);
    });

    return () => {
      sub.unsubscribe();
    };
  }, [game]);

  const value = {
    layer,
    setLayer,
    game,
    player,
    players,
    moves,
    endTurn,
    addPlayer,
    removePlayer,
    start,
    board: game.layerFor(layer) || nullBoard,
    state: gameState,
  };

  return <GameContext value={ value }>{ children }</GameContext>;
}