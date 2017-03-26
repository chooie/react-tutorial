export function getStatusBasedOnWhetherThereIsAWinner(
  winnerResults, nextPlayer, stepNumber) {
  var status;

  if (winnerResults) {
    status = "Winner: " + winnerResults.winner;
  } else if (stepNumber === 9) {
    status = "It's a draw!";
  } else {
    status = "Next player: " + nextPlayer;
  }
  return status;
}
