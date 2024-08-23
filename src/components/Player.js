import { useBlackjackContext } from '../utils/BlackjackContext'
import Card from './Card'

const Player = () => {
  const { currentHands, hit, handleDealerTurn, handleAITurn, calculateHand } =
    useBlackjackContext()

  const displayHand = currentHands?.player?.map((card) => (
    <Card key={card.id} card={card.card} suit={card.suit} />
  ))
  return (
    <div>
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
            handleAITurn()
            handleDealerTurn()
          }}
        >
          STAY
        </button>
        <button>SPLIT</button>
      </div>
      {currentHands.player && <h1>{calculateHand(currentHands.player)}</h1>}
    </div>
  )
}
export default Player
