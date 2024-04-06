
import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"

function App() {
  const [currPlayer, setCurrPlayer] = useState('X');

  function handleSelect(){
    setCurrPlayer(prevPlayer=>currPlayer == 'X' ? 'O' : 'X');
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={'Player 1'} symbol={'X'} isActive={currPlayer === 'X'}></Player>
          <Player name={'Player 2'} symbol={'O'} isActive={currPlayer === 'O'}></Player> 
        </ol>
 
        <GameBoard onHandleSelect={handleSelect} activePlayer={currPlayer}/>
      </div>
    </main>

  )
}

export default App
