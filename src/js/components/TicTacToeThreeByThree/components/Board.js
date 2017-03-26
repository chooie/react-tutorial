import React from "react";

export default class Board extends React.Component {
  render() {
    const numberOfRows = 3;
    const numberOfColumns = 3;
    const squares = this.props.squares;
    const onClick = this.props.onClick;
    const winnerResults = this.props.winnerResults;
    const stepNumber = this.props.stepNumber;
    let rows = [];
    for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex += 1) {
      rows.push(
        <BoardRow
          key={ rowIndex }
          rowNumber={ rowIndex }
          numberOfColumns={ numberOfColumns }
          squares={ squares }
          onClick={ onClick }
          winnerResults={ winnerResults }
          stepNumber={ stepNumber }
        />
      );
    }
    return (
      <div className="game-board">
        { rows }
      </div>
    );
  }
}

function BoardRow(props) {
  const rowNumber = props.rowNumber;
  const numberOfColumns = props.numberOfColumns;
  const squares = props.squares;
  const onClick = props.onClick;
  const winnerResults = props.winnerResults;
  const stepNumber = props.stepNumber;
  let columns = makeColumnsForRow(rowNumber, numberOfColumns, squares, onClick,
                                  winnerResults, stepNumber);
  return (
    <div key={rowNumber} className="board-row">
      { columns }
    </div>
  );

  function makeColumnsForRow(rowNumber, numberOfColumns, squares, onClick,
                             winnerResults, stepNumber) {
    let columns = [];
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex += 1) {
      let absoluteIndex = (rowNumber * numberOfColumns) + columnIndex;
      let square = makeSquare(absoluteIndex,
                              squares[absoluteIndex],
                              () => onClick(absoluteIndex),
                              winnerResults,
                              stepNumber);
      columns.push(square);
    }
    return columns;
  }

  function makeSquare(absoluteIndex, value, onClick, winnerResults) {
    return (
      <Square
        key={ absoluteIndex }
        index={ absoluteIndex }
        value={ value }
        onClick={ () => onClick(absoluteIndex) }
        winnerResults={ winnerResults }
        stepNumber={ stepNumber }
      />
    );
  }
}

function Square(props) {
  const winnerResults = props.winnerResults;
  const winningPositions = winnerResults ? winnerResults.winningPositions : [];
  const index = props.index;
  const stepNumber = props.stepNumber;
  const isWinningMove = winningPositions.indexOf(index) > -1;
  const activeIfWinning = isWinningMove ? "winning-move" : "";
  const isADraw = !winnerResults && stepNumber === 9;
  const drawIfDraw = isADraw ? "draw" : "";
  const classesToAdd = ["square", activeIfWinning, drawIfDraw];
  const classArray = classesToAdd.filter(function(className) {
    return !!className;
  });
  const className = classArray.join(" ");
  return (
    <button className={ className } onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}
