import { useContext, useState, type FormEvent } from "react";
import { GameContext } from "../contexts/game-context";
import Player from "../game/player";

export function Setup() {
  const gameContext = useContext(GameContext);
  const [newPlayer, setNewPlayer] = useState<string>('');
  const onPlayerInput = (event: FormEvent<HTMLInputElement>) => {
    setNewPlayer((event.target as HTMLInputElement).value);
  };
  const onAddPlayer = () => {
    if (!newPlayer) return;
    gameContext.addPlayer(Player.create(newPlayer));
    setNewPlayer('');
  };
  const onRemovePlayer = (player: Player) => {
    gameContext.removePlayer(player);
  };
  const onStart = () => {
    gameContext.start();
  };
  const canStart = gameContext.players.length > 1;
  const canAdd = gameContext.players.length <= 4;

  return <div className="flex flex-col p-2 bg-slate-200 rounded-lg">
    <div className="flex flex-col gap-2">
      { gameContext.players.map((player, index) => {
        return <div className="flex flex-row my-2 gap-2 items-center" key={ index }>
          <span className="flex-1">{ player.name }</span>
          <button className="px-2 py-1 bg-slate-300 rounded-xl hover:bg-slate-400 cursor-pointer" onClick={ () => onRemovePlayer(player) }>-</button>
        </div>;
      }) }
    </div>
    { canAdd && <div className="flex flex-row gap-2">
      <input type="text" className="bg-slate-300 rounded-md border-1 border-transparent hover:border-slate-500 focus:bg-white outline-none focus:border-slate-600 transition-all duration-200 px-2 py-1" onInput={ onPlayerInput } value={ newPlayer } />
      <button className="bg-slate-500 rounded-xl px-2 py-1 cursor-pointer" onClick={ onAddPlayer } disabled={ !newPlayer }>Add</button>
    </div> }
    <div className="flex flex-row gap-2 my-2">
      <button className="rounded-xl bg-emerald-700 hover:bg-emerald-800 cursor-pointer text-white px-2 py-1 flex-1 disabled:bg-emerald-700/70 disabled:hover:bg-emerald-700/70" onClick={ onStart } disabled={ !canStart }>Start Game</button>
    </div>
  </div>;
}