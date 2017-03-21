import React from "react";
import ReactDOM from "react-dom";
import * as util from "./util";

import Board from "./Board";
import GameInfo from "./GameInfo";

util.setupInteraction();

class TicTacToeThreeByThree extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(clickedSquareIndex) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squaresCopy = current.squares.slice();

    if (calculateWinner(squaresCopy) || squaresCopy[clickedSquareIndex]) {
      return;
    }

    squaresCopy[clickedSquareIndex] = this.getNextPlayerSymbol(this.state.xIsNext);
    this.setState({
      history: history.concat([{
        squares: squaresCopy
      }]),
      stepNumber: this.state.stepNumber + 1,
      xIsNext: !this.state.xIsNext
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + this.getNextPlayerSymbol(this.state.xIsNext);
    }

    const moves = history.map((step, move) => {
      const description = move ? "Move #" + move : "Game start";
      return (
        <li key={ move }>
          <a href="#" onClick={ () => this.jumpTo(move) }>{ description }</a>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={ current.squares }
            onClick={ (currentSquareIndex) =>
                      this.handleClick(currentSquareIndex) }
          />
        </div>
        <GameInfo
          status={ status }
          moves={ moves }
        />
      </div>
    );
  }

  getNextPlayerSymbol(xIsNext) {
    return xIsNext ? "X" : "O";
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: this.xIsNextIfStepIsOdd(step)
    });
  }

  xIsNextIfStepIsOdd(step) {
    return (step % 2) ? false: true
  }
}

// ========================================

ReactDOM.render(
  <TicTacToeThreeByThree />,
  document.getElementById("container")
);

function calculateWinner(squares) {
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
      return squares[a];
    }
  }
  return null;
}
