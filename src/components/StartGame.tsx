import { useContext } from "react";
import { PlayerManagerContext } from "../contexts/players-context";
import { GameContext } from "../contexts/game-context";

export function StartGame() {
  const gameContext = useContext(GameContext);
  const playerContext = useContext(PlayerManagerContext);
  const playerCount = playerContext.players.length;
  const canStart = [2, 3, 4].includes(playerCount);
  const onStart = () => {
    gameContext.game.startTurn(playerContext.next());
  };
  const classes = [!canStart && 'opacity-20', 'cursor-pointer'].filter(Boolean).join(' ');

  return <button className={ classes } disabled={ !canStart } onClick={ onStart }>
    Start Game
  </button>
}