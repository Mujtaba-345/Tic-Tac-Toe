import { useState } from "react";
import "./Game.css";
import Board from "../Board/Board";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
  };

  let moves = history.map((squares, move) => {
    const description = move > 0 ? `Go to move # ${move}` : "Go to game start";

    return (
      <li key={move}>
        {move === currentMove ? (
          <span>{`You are at move # ${move}`}</span>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });

  if (!isAscending) {
    moves = moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <div>
          <button
            onClick={toggleSortOrder}
            className={moves.length > 1 ? "enable" : "disable"}
          >
            Toggle Sort Order
          </button>
        </div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
