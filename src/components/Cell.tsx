import { useContext, useEffect, useMemo } from "react";
import { Coordinate } from "../game/coordinate";
import { GameContext } from "../contexts/game-context";

type CellProps = {
  a: number,
  b: number,
};

export function Cell({
  a,
  b,
}: CellProps) {
  const gameContext = useContext(GameContext);
  const coordinate = useMemo<Coordinate>(() => {
    return Coordinate.create(a, b);
  }, [a, b]);
  const size = gameContext.game.boardSize;
  const selectBoard = gameContext.game.selectBoard();
  const hoverBoard = gameContext.game.hoverBoard();
  const selected = selectBoard.valueFor(coordinate);
  const hover = hoverBoard.valueFor(coordinate);
  const onClick = () => {
    const newValue = selected > 0 ? 0 : 1;
    console.log('SETTING VALUE', newValue);
    selectBoard.setValueFor(coordinate, newValue);
  };
  const onMouseOver = () => {
    hoverBoard.addValueFor(coordinate, 1);
  };
  const onMouseOut = () => {
    hoverBoard.subtractValueFor(coordinate, 1);
  };

  useEffect(() => {
    console.log('UPDATED');
  }, [selectBoard.toString()]);

  const classes = [
    'inline-block',
    'w-5',
    'h-5',
    'border-1',
    'm-0',
    'leading-none',
    'box-border',
    'overflow-hidden',
    selected > 0 && 'border-red-500',
    hover > 0 && 'bg-green-400',
  ].filter(Boolean).join(' ');

  return <div
    className={ classes }
    onClick={ onClick }
    onMouseOver={ onMouseOver }
    onMouseOut={ onMouseOut }
  >{ selected }</div>;
}