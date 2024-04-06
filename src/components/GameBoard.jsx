import { useState } from "react";

let initialBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

export default function GameBoard({onHandleSelect, activePlayer}){

    const [gameBoard, setGameBoard] = useState(initialBoard);

    function handleBoardEvent(row, col){
        setGameBoard(oldGameBoard=>{
            let newBoard = [...oldGameBoard.map(innerArr=>[...innerArr])];
            newBoard[row][col] = activePlayer;
            return newBoard;
        })

        onHandleSelect();
    }

    return (
        <ol id='game-board'>
            {gameBoard.map((row, rowIndex)=>(
                <li key={rowIndex}>
                    <ol>
                        {row.map((symbol, colIndex)=>(
                            <li key={colIndex}>
                                <button onClick={()=>handleBoardEvent(rowIndex, colIndex)}>{symbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
};