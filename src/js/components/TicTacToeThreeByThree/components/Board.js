import React from "react";

export default class Board extends React.Component {
  renderSquare(i) {
    return <Square value={ this.props.squares[i] }
                   onClick={ () => this.props.onClick(i) }/>;
  }

  render() {
    return (
      <div className="game-board">
        <BoardRow
          rowNumber={ 0 }
          numberOfColumns={ 3 }
          squares={ this.props.squares }
          onClick={ this.props.onClick }
        />
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

function BoardRow(props) {
  let rowNumber = props.rowNumber;
  let numberOfColumns = props.numberOfColumns;
  let squares = props.squares;
  let onClick = props.onClick;
  var columns = [];
  for (let columnIndex = 0;
       columnIndex < numberOfColumns;
       columnIndex += 1) {
    let absoluteIndex = (rowNumber * numberOfColumns) + columnIndex;
    let square = (
      <Square
        key={ absoluteIndex }
        value={ squares[absoluteIndex] }
        onClick={ () => onClick(absoluteIndex) }
      />
    );
    columns.push(square);
  }
  return (
    <div key={rowNumber} className="board-row">
      { columns }
    </div>
  );
}

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}
