import React from "react";

export default function GameInfo(props) {
  return (
    <div className="game-info">
      <div>{ props.status }</div>
      <ol>{ props.moves }</ol>
    </div>
  );
}
