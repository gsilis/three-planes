import { useContext, useMemo } from "react";
import { GameContext } from "../contexts/game-context";
import { Board as BoardData } from "../game/board";
import { BoardType } from "../game/board-type";
import { Cell } from "./Cell";

['w-50', 'w-55', 'w-60', 'w-65', 'w-70', 'w-75', 'w-80', 'w-85', 'w-90', 'w-95', 'w-100', 'w-105', 'w-110'];
['h-50', 'h-55', 'h-60', 'h-65', 'h-70', 'h-75', 'h-80', 'h-85', 'h-90', 'h-95', 'h-100', 'h-105', 'h-110'];

export function Board() {
  const gameContext = useContext(GameContext);
  const size = gameContext.game.boardSize;
  const grid = useMemo<BoardData>(() => {
    return new BoardData(BoardType.NULL, size);
  }, [size]);
  const classes = [
    'leading-none',
    'text-[0px]',
    `w-${size * 5}`,
    `h-${size * 5}`,
  ].filter(Boolean).join(' ');

  return <div className={ classes }>{
    grid.cells.map((row, a) => {
      return row.map((_, b) => {
        return <Cell a={ a } b={ b } />;
      });
    }) 
  }</div>;
}