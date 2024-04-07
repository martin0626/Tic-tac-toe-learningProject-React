
import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";


let initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function getCurrentPlayer(gameTurns){
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }

  return currentPlayer
}

const winningCombinations = WINNING_COMBINATIONS;



function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({'X': 'Player 1', 'O': 'Player 2'})

  let activePlayer = getCurrentPlayer(gameTurns);


  let gameBoard = [...initialBoard.map(arr => [...arr])];

  gameTurns.forEach(turn =>{
      const { square, player } = turn;
      const {row, col} = square;
      gameBoard[row][col] = player
  })

  let winner = null;

  winningCombinations.forEach(combination=>{
    let firstSymbol = gameBoard[combination[0].row][combination[0].column];
    let secondSymbol = gameBoard[combination[1].row][combination[1].column];
    let thirdSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSymbol &&
      firstSymbol == secondSymbol &&
      firstSymbol == thirdSymbol
    ){
      winner = players[firstSymbol];
    }

  })

  function handleSelect(rowIndex, colIndex){
    setGameTurns(prevTurns=>{
      let currentPlayer = getCurrentPlayer(gameTurns);

      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player: currentPlayer},
        ...prevTurns,
      ];

      return updatedTurns;

    })

  }

  function handleEditPlayer(symbol, name){
    setPlayers(prevPlayers=>{
      let newPlayers =  {...prevPlayers};
      newPlayers[symbol] = name;
      return newPlayers
    })
  }

  function handleRematch(){
    setGameTurns([]);
  }
  

  let draw = gameTurns.length == 9 && !winner;

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={'Player 1'} symbol={'X'} isActive={activePlayer === 'X'} onEdit={handleEditPlayer}></Player>
          <Player name={'Player 2'} symbol={'O'} isActive={activePlayer === 'O'} onEdit={handleEditPlayer}></Player> 
        </ol>
        {winner && <GameOver winner={winner} onRematch={handleRematch}/>}
        {draw && <GameOver winner={winner} onRematch={handleRematch}/>}

        <GameBoard onHandleSelect={handleSelect} board={gameBoard}/>
      </div>
      <Log turns={gameTurns} />
    </main>

  )
}

export default App
