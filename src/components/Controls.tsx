import { useContext } from "react";
import { GameContext } from "../contexts/game-context";
import { Setup } from "./Setup";
import { GameState } from "../game/game-state";
import { Turn } from "./Turn";

export function Controls() {
  const gameContext = useContext(GameContext);

  const isSetup = gameContext.state === GameState.SETUP;
  const isTurn = gameContext.state === GameState.TURN;

  return <div className="mx-1">
    { isSetup && <Setup /> }
    { isTurn && <Turn /> }
  </div>;
}