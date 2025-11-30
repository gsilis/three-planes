import { createContext, useMemo, useState } from "react";
import PlayerManager from "../game/player-manager";
import Player from "../game/player";

export const ALLOWED_PLAYERS = [2, 3, 4];

type PlayerManagerContextShape = {
  manager: PlayerManager,
  players: Player[],
  player: Player | null,

  add: (player: Player) => void,
  next: () => Player,
  remove: (player: Player) => void,
};

export const PlayerManagerContext = createContext<PlayerManagerContextShape>({
  manager: new PlayerManager(),
  players: [],
  player: null,

  add: () => {},
  next: () => Player.create('NULL'),
  remove: () => {},
});

export function PlayerManagerContextProvider({ children }: { children: any }) {
  const manager = useMemo<PlayerManager>(() => {
    return new PlayerManager();
  }, []);
  const [players, setPlayers] = useState<Player[]>([]);
  const [player, setPlayer] = useState<Player | null>(null);

  const add = (player: Player) => {
    manager.add(player);
    setPlayers(manager.all());
  };
  const remove = (player: Player) => {
    manager.remove(player);
    setPlayers(manager.all());
  };
  const next = () => {
    const nextPlayer = manager.next();
    setPlayer(nextPlayer);
    return nextPlayer;
  };
  const value = {
    manager,
    players,
    player,
    add,
    next,
    remove,
  };

  return <PlayerManagerContext value={ value }>{ children }</PlayerManagerContext>;
}