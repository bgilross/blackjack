import { useBlackjackContext } from '../utils/BlackjackContext'
import { calculateHand } from '../utils/blackjacklogic'
import { useBlackjack } from '../utils/useBlackjack'
import Card from './Card'

const Player2 = () => {
  const { currentHands, hit, gameState, deck, calculateHand } =
    useBlackjackContext()

  

  const displayHand = currentHands.player0.map((card) => (
    <Card key={card.id} card={card.card} suit={card.suit} />
  ))
  return (
    <div className="pa3 br2 bg-light-green shadow-1">
      <h2 className="f3 mb3 tc">Your Hand</h2>

      <div className="flex justify-center">{displayHand}</div>
      <button
        onClick={() => {
          hit('player0')
        }}
      >
        HIT
      </button>
      <button>STAY</button>
      <button>SPLIT</button>
      {/* {displayHand.length > 1 && <div>{calculateHand(displayHand)}</div>} */}
    </div>
  )
}
export default Player2
