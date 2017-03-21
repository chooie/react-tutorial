import React from "react";
import ReactDOM from "react-dom";
import * as util from "./util";

import TicTacToeThreeByThree from "./components/TicTacToeThreeByThree/core";

util.setupInteraction();

ReactDOM.render(
  <TicTacToeThreeByThree />,
  document.getElementById("container")
);
