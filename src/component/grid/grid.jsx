import { useState } from "react";
import Card from "../card/card";
import "../grid/grid.css";
import isWinner from "../../helper/main";
function Grid({ numberOfCard }) {
  const [board, setBoard] = useState(Array(numberOfCard).fill(""));
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState(null);
  function play(index) {
    if (turn == 1) {
      board[index] = "O";
    } else {
      board[index] = "X";
    }
    setBoard([...board]);
    setTurn(!turn);
    const win = isWinner(board, turn ? "O" : "X");
    if (win) {
      setWinner(win);
    }
  }
  function reset() {
    setTurn(true);
    setWinner(null);
    setBoard(Array(numberOfCard).fill(""));
  }
  return (
    <div className="grid-wrapper">
      {winner && (
        <>
          <h2 className="turn-winner"> Winner Is {winner}</h2>
          <button className="reset" onClick={reset}>
            Reset Game
          </button>
        </>
      )}
      <h4 className="turn">Current Player: {turn ? "O" : "X"}</h4>
      <div className="grid">
        {board.map((element, idx) => (
          <Card
            gameEnd={winner ? true : false}
            key={idx}
            onPlay={play}
            player={element}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
}

export default Grid;
