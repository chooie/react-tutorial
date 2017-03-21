export function getStatusBasedOnWhetherThereIsAWinner(winner, nextPlayer) {
  var status;

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + nextPlayer;
  }
  return status;
}
