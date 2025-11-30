import { useContext } from "react";
import { PlayerManagerContext } from "../contexts/players-context";
import type Player from "../game/player";

export function PlayerList() {
  const playerContext = useContext(PlayerManagerContext);
  const onRemove = (player: Player) => {
    playerContext.remove(player);
  };

  return <div className="flex flex-col">
    { playerContext.players.map((player, index) => {
      return <div className="flex flex-row" key={ index }>
        <p className="flex-1">{ player.name }</p>
        <button className="cursor-pointer" title={ `Remove ${player.name}` } onClick={ () => onRemove(player) }>-</button>
      </div>
    }) }
  </div>;
}