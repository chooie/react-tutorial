export function getStatusBasedOnWhetherThereIsAWinner(winnerResults, nextPlayer) {
  var status;

  if (winnerResults) {
    status = "Winner: " + winnerResults.winner;
  } else {
    status = "Next player: " + nextPlayer;
  }
  return status;
}
