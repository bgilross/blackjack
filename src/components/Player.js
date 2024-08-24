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
      <div className="pa1 br2 shadow-1">
        <div className="ba br2 pa2 flex flex-column justify-center items-center">
          <h2 className="f3 tc">Your Hand</h2>
          <div className="flex">{displayHand}</div>
          <div>
            <button
              onClick={() => {
                hit('player')
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
      </div>
    </div>
  )
}
export default Player
