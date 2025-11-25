import { useContext } from "react";
import { Board } from "./components/Board";
import { GameContext } from "./contexts/game-context";
import { Controls } from "./components/Controls";

function App() {
  const gameContext = useContext(GameContext);

  return <div className="flex flex-row h-screen">
    <div className="flex-1 grid grid-cols-1">
      <Board board={ gameContext.board } />
    </div>
    <div className="flex-[0_200px]">
      <Controls />
    </div>
  </div>;
}

export default App;
