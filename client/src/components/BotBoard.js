import React, { useState} from "react";
import { checkWin } from "../utils/checkWin";
import Turn from "./Turn";
import "../App.css"
import App from "../App";
import Title from "./Title";
import axios from "axios";
import { noMoves } from "../utils/noMoves";

const numRows = 6;
const numCols = 7;


function BotBoard() {
  const [board, setBoard] = useState(Array.from({ length: numCols }, () => Array(numRows).fill(0)))
  const [currentPlayer, setCurrentPlayer] = useState(1);  
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [win, changeWin] = useState(false)
  const [newGame, startNewGame] = useState(false)
  const [clicksDisabled, setClicksDisabled] = useState(false);
  const [zeroMoves, setZeroMoves] = useState(false)



  function handleCellClick (colIndex)  {

    if (!clicksDisabled) {
    setClicksDisabled(true)
    const newBoard = board.map(row => [...row]); 

    const rowIndex = newBoard[colIndex].lastIndexOf(0);

    if (rowIndex !== -1) { 
      
      newBoard[colIndex][rowIndex] = currentPlayer;
      setBoard(newBoard);
      

      if (checkWin(newBoard, currentPlayer)) {
        changeWin(true)
        setTimeout(() => {
          setPopupOpen(true)
         }, 700)
        

      } 
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      async function fetchData() {
        const res = await axios.post('http://127.0.0.1:5000/api', {"matrix": newBoard})
        const updatedBoard = JSON.parse(res.data.board)
        
        setBoard(updatedBoard)

        if (noMoves(updatedBoard)) {
          setZeroMoves(true)
        }

        if (checkWin(updatedBoard, 2)) {
          changeWin(true)
          setClicksDisabled(true)
          setTimeout(() => {
            setPopupOpen(true)
           }, 900)
        } else {
          setCurrentPlayer(1)
          setTimeout(() => {
            setClicksDisabled(false)


          }, 500)

        }          
  }
  fetchData()
   
    } else {
      setClicksDisabled(false)
      
    }
    
      
    } 
      
}

  if (newGame) {
    return (

      <App/>
    )
  } else {

  return (
    <>
    <Title/>
    <div className="center-div">
    {zeroMoves && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="center-div">
              <h3>NO MOVES LEFT</h3>
              <button onClick={() => {startNewGame(true)}}>NEW GAME</button>
              </div>
              </div>
        </div>
      )}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            
            {currentPlayer===1 ? (
              <div className="center-div">
              <h3>RED PLAYER WON</h3>
              <button onClick={() => {startNewGame(true)}}>NEW GAME</button>
              </div>
            ) : (
              <div className="center-div">
              <h3>YELLOW PLAYER WON</h3>
              <button onClick={() => {startNewGame(true)}}>NEW GAME</button>
              </div>
            )}
          </div>
        </div>
      )}
      {currentPlayer===1 ? (
        <Turn color="red"/>
      ) : (
        <Turn color="yellow"/>
      )}
      {win ? (
        <div className="board">
        {board.map((column, colIndex) => (
          <div key={colIndex} className="column ">
            {column.map((cell, rowIndex) => (
              <div key={rowIndex} className={`cell player${cell} `} />
            ))}
          </div>
        ))}
        </div>

      ) : (
        <div className="board">
      
      {board.map((column, colIndex) => (
        <div key={colIndex} className="column " onClick={() => handleCellClick(colIndex)}>
          {column.map((cell, rowIndex) => (
            <div key={rowIndex} className={`cell player${cell} `} />
          ))}
        </div>
      ))}
    </div>
      )}
    </div>
    </>
  );
}
}


export default BotBoard;