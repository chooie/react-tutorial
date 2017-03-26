import React from "react";

export default class Board extends React.Component {
  render() {
    const numberOfRows = 3;
    const numberOfColumns = 3;
    const squares = this.props.squares;
    const onClick = this.props.onClick;
    let rows = [];
    for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex += 1) {
      rows.push(
        <BoardRow
          key={ rowIndex }
          rowNumber={ rowIndex }
          numberOfColumns={ numberOfColumns }
          squares={ squares }
          onClick={ onClick }
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
  let columns = makeColumnsForRow(rowNumber, numberOfColumns, squares, onClick);
  return (
    <div key={rowNumber} className="board-row">
      { columns }
    </div>
  );

  function makeColumnsForRow(rowNumber, numberOfColumns, squares, onClick) {
    let columns = [];
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex += 1) {
      let absoluteIndex = (rowNumber * numberOfColumns) + columnIndex;
      let square = makeSquare(absoluteIndex,
                              squares[absoluteIndex],
                              () => onClick(absoluteIndex));
      columns.push(square);
    }
    return columns;
  }

  function makeSquare(absoluteIndex, value, onClick) {
    return (
      <Square
        key={ absoluteIndex }
        value={ value }
        onClick={ () => onClick(absoluteIndex) }
      />
    );
  }
}

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}
