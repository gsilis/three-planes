import { AddPlayer } from "./AddPlayer";
import { PlayerList } from "./PlayerList";
import { StartGame } from "./StartGame";

export function Setup() {
  return <div className="flex flex-col">
    <PlayerList />
    <AddPlayer />
    <StartGame />
  </div>;
}