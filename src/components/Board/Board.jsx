import './Board.css'
import calculateWinner from '../../helperFunction/calculateWinner';
import Square from '../Square/Square'


function Board({ xIsNext, squares, onPlay }) {

  function handleClick(i,row_id,col_id) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares,row_id,col_id);
  }

  const winner = calculateWinner(squares)
  let status;
  if (winner) {
    status = 'Winner: ' + winner.map(value => value+1);
  } else if (squares.every(square => square !== null)) {
    status = 'Draw';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const boardRows = [];
  for (let row = 0; row < 3; row++) {
    const squaresInRow = [];
    for (let col = 0; col < 3; col++) {
      const index = row * 3 + col;
      const row_id=row+1
      const col_id=col+1

      squaresInRow.push(
        <Square
          key={index}
          value={squares[index]}
          onSquareClick={() => handleClick(index,row_id,col_id)}
        />
      );
    }
    boardRows.push(<div key={row} className="board-row">{squaresInRow}</div>);
  }

  return (
    <>
      <div className="status">{status}</div>
      {boardRows}
    </>
  );
}


export default Board