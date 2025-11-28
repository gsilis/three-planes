import { Board } from "./components/Board";
import { Controls } from "./components/Controls";

function App() {
  return <div className="flex flex-row h-screen">
    <div className="flex-1 grid grid-cols-1">
      <Board />
    </div>
    <div className="flex-[0_200px]">
      <Controls />
    </div>
  </div>;
}

export default App;
