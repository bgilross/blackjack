export const Scoreboard = ({ total }) => {
  return (
    <div className="flex justify-between">
      <div>PlayerWins: {total.playerScore}</div>
      <div>Ties: {total.ties}</div>
      <div>Dealer Wins: {total.dealerScore}</div>
    </div>
  )
}
