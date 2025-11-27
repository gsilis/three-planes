import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GameContextProvider } from './contexts/game-context.tsx'
import { SelectedCellContextProvider } from './contexts/selected-cell-context.tsx'
import { SelectedPieceContextProvider } from './contexts/selected-piece-context.tsx'
import { MoveContextProvider } from './contexts/move-context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameContextProvider>
      <SelectedCellContextProvider>
        <SelectedPieceContextProvider>
          <MoveContextProvider>
            <App />
          </MoveContextProvider>
        </SelectedPieceContextProvider>
      </SelectedCellContextProvider>
    </GameContextProvider>
  </StrictMode>,
)
