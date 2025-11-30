import { useContext } from "react";
import { PlayerManagerContext } from "../contexts/players-context";

export function Turn() {
  const playerContext = useContext(PlayerManagerContext);

  return <div className="">
    <p>Player: { playerContext.player?.name }</p>
    
  </div>;
}