import { useBlackjackContext } from '../utils/BlackjackContext'
import Card from './Card'

const Player2 = () => {
  const { currentHands, hit, handleDealerTurn, calculateHand } =
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
      <button
        onClick={() => {
          handleDealerTurn()
        }}
      >
        STAY
      </button>
      <button>SPLIT</button>
      {/* <div>{calculateHand(currentHands.player0)}</div> */}
    </div>
  )
}
export default Player2
