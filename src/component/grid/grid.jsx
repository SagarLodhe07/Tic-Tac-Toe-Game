import { useState } from "react";
import Card from "../card/card";
import "../grid/grid.css";
import isWinner from "../../helper/main";
function Grid({ numberOfCard }) {
  const [board, setBoard] = useState(Array(numberOfCard).fill(""));
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  function play(index) {
    if (board[index] !== "" || winner || isDraw) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = turn ? "O" : "X";
    setBoard(newBoard);
    setTurn(!turn);
    const win = isWinner(newBoard, turn ? "O" : "X");
    if (win) {
      setWinner(turn ? "O" : "X");
    } else if (newBoard.every((cell) => cell !== "")) {
      setIsDraw(true);
    }
  }
  function reset() {
    setTurn(true);
    setWinner(null);
    setIsDraw(false);
    setBoard(Array(numberOfCard).fill(""));
  }

  return (
    <div className="grid-wrapper">
      {winner && (
        <>
          <h2 className="turn-winner"> Winner Is : {winner}</h2>
          <button className="reset" onClick={reset}>
            RESET
          </button>
        </>
      )}
      {!winner && isDraw && (
        <>
          <h2 className="draw-Text">It's Draw</h2>
          <button className="reset" onClick={reset}>
          RESET
          </button>
        </>
      )}
      {!winner && !isDraw && (
        <h4 className="turn">Current Player: {turn ? "O" : "X"}</h4>
      )}
      <div className="grid">
        {board.map((element, idx) => (
          <Card
            gameEnd={winner || isDraw ? true : false}
            key={idx}
            onPlay={() => play(idx)}
            player={element}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
}

export default Grid;
