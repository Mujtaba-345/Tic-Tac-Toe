import { useState } from "react";
import "./Game.css";
import Board from "../Board/Board";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const [moveLocation,setMoveLocation]=useState([]);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares,row_id,col_id) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    const nextMoveLocation = [...moveLocation.slice(0, moveLocation.length), { row_id, col_id }];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setMoveLocation(nextMoveLocation);

  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
  };

  let moves = history.map((squares, move) => {
    const{row_id,col_id}=moveLocation[move] ||{'row_id':null,'col_id':null}
    const description = move > 0 ? `Go to move # ${move}` : "Go to game start";

    return (
      <li key={move}>
        {move === currentMove ? (
          <span>{`You are at move # ${move}`}</span>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
        <br/>
        <span>Row :{row_id},Col:{col_id}</span>
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
