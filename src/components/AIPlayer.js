import { useBlackjackContext } from '../utils/BlackjackContext'
import Card from './Card'

const AIPlayer = ({ name }) => {
  const { currentHands, hit, handleDealerTurn, calculateHand, playerList } =
    useBlackjackContext()

  const displayHand = currentHands[name]?.map((card) => (
    <Card key={card.id} card={card.card} suit={card.suit} />
  ))
  return (
    <div>
      <div className="pa3 br2 bg-light-green shadow-1 ma4">
        <h2 className="f3 mb3 tc">{name}'s Hand</h2>
        <div className="flex justify-center">{displayHand}</div>
        {currentHands[name] && <h1>{calculateHand(currentHands[name])}</h1>}
      </div>
    </div>
  )
}
export default AIPlayer
