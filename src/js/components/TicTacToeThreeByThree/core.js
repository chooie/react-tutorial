import React from "react";

import Board from "./components/Board";
import GameInfo from "./components/GameInfo";

import * as logic from "./logic";
import * as message from "./message";

export default class TicTacToeThreeByThree extends React.Component {
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

    if (logic.thereIsAWinner(squaresCopy) ||
        logic.theSquareIsFilled(squaresCopy, clickedSquareIndex)) {
      return;
    }

    squaresCopy[clickedSquareIndex] =
      logic.getNextPlayerSymbol(this.state.xIsNext);

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
    const stepNumber = this.state.stepNumber;
    const currentBoard = history[stepNumber];
    const winnerResults = logic.calculateWinner(currentBoard.squares);

    let status =
        message.getStatusBasedOnWhetherThereIsAWinner(
          winnerResults, logic.getNextPlayerSymbol(this.state.xIsNext)
        );

    const moves = getMoveHistoryElements(stepNumber,
                                         history,
                                         this.jumpTo.bind(this));

    return (
      <div className="game">
        <Board
          squares={ currentBoard.squares }
          onClick={ (currentSquareIndex) =>
                    this.handleClick(currentSquareIndex) }
          winnerResults={ winnerResults }
        />
        <GameInfo
          status={ status }
          moves={ moves }
        />
      </div>
    );
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: logic.xIsNextIfStepIsOdd(step)
    });
  }
}

function getMoveHistoryElements(stepNumber, history, onClickToCall) {
  return history.map((step, move) => {
    const description = move ? "Move #" + move : "Game start";
    const isCurrentMove = stepNumber === move;
    const activeClassIfCurrentMove = isCurrentMove ? "active" : "";
    return (
      <li key={ move }>
        <a href="#"
           onClick={ () => onClickToCall(move) }
           className={ activeClassIfCurrentMove }>
          { description }
        </a>
      </li>
    );
  });
}
