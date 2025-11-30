import { useContext, useRef, useState, type ChangeEvent } from "react";
import { ALLOWED_PLAYERS, PlayerManagerContext } from "../contexts/players-context";
import Player from "../game/player";
import { maxFrom } from "../utilities/array";

export function AddPlayer() {
  const playerContext = useContext(PlayerManagerContext);
  const [player, setPlayer] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const playerCount = playerContext.players.length;
  const canAdd = playerCount < maxFrom(ALLOWED_PLAYERS) && player.length > 0;
  const buttonClasses = [
    !canAdd && 'opacity-50',
    'cursor-pointer'
  ].filter(Boolean).join(' ');

  const onInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayer(event.target.value);
  };
  const onAdd = () => {
    playerContext.add(Player.create(player));
    setPlayer('');
    inputRef.current?.focus();
  };

  return <div className="flex flex-col">
    <input className="bg-slate-200" ref={ inputRef } type="text" onInput={ onInput } value={ player } />
    <button className={ buttonClasses } onClick={ onAdd } disabled={ !canAdd }>Add</button>
  </div>;
}