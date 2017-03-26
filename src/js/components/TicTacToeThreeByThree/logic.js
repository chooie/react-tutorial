export function thereIsAWinner(squares) {
  return calculateWinner(squares);
}

export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winningPositions: [a, b, c]
      };
    }
  }
  return null;
}

export function theSquareIsFilled(squares, clickedSquareIndex) {
  return squares[clickedSquareIndex];
}

export function xIsNextIfStepIsOdd(step) {
  return (step % 2) ? false: true
}

export function getNextPlayerSymbol(xIsNext) {
  return xIsNext ? "X" : "O";
}
