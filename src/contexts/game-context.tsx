import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { Game } from "../game/game"
import PlayerManager from "../game/player-manager";
import { PlayerManagerContext } from "./players-context";
import { GameState } from "../game/game-state";

const BOARD_SIZE = 21;

type GameContextShape = {
  game: Game,
  state: GameState,
}

export const GameContext = createContext<GameContextShape>({
  game: new Game(0, new PlayerManager()),
  state: GameState.NULL,
});

export function GameContextProvider({ children }: { children: any }) {
  const players = useContext(PlayerManagerContext);
  const [state, setState] = useState<GameState>(GameState.NULL);

  const game = useMemo<Game>(() => {
    return new Game(BOARD_SIZE, players.manager);
  }, []);

  useEffect(() => {
    const sub = game.state().subscribe((newState) => {
      setState(newState);
    });

    return () => sub.unsubscribe();
  }, [game, setState]);

  const value = {
    game,
    state,
  };

  return <GameContext value={ value }>{ children }</GameContext>;
}