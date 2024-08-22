import { useBlackjackContext } from '../utils/BlackjackContext'
import Card from './Card'

const AIPlayer = ({ playerNumber }) => {
  const { currentHands, hit, handleDealerTurn, calculateHand, playerList } =
    useBlackjackContext()

  const displayHand = currentHands[`player${playerNumber}`].map((card) => (
    <Card key={card.id} card={card.card} suit={card.suit} />
  ))
  return (
    <div>
      <div className="pa3 br2 bg-light-green shadow-1">
        <h2 className="f3 mb3 tc">Player{playerNumber} Hand</h2>
        <div className="flex justify-center">{displayHand}</div>
      </div>
      <h1>{calculateHand(currentHands.player0)}</h1>
    </div>
  )
}
export default AIPlayer
