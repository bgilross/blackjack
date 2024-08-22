import Card from './Card'
import CardBack from '../images/cards/CardBack.png'
import { useBlackjackContext } from '../utils/BlackjackContext'

const Dealer2 = () => {
  const { currentHands, gameState } = useBlackjackContext()
  const { isGameOver, isPlayerTurn } = gameState

  const displayHand = currentHands?.dealer?.map((card, index) => {
    if (index != 1) {
      return <Card key={card.id} card={card.card} suit={card.suit} />
    } else {
      if (!isGameOver && isPlayerTurn) {
        return (
          <img
            key={index}
            src={CardBack}
            alt="card back"
            height="150"
            width="100"
          />
        )
      } else {
        return <Card key={card.id} card={card.card} suit={card.suit} />
      }
    }
  })

  return (
    <div className="pa3 br2 bg-light-red shadow-1">
      <h2 className="f3 mb3 tc">Dealer's Hand</h2>
      <div className="flex justify-center">{displayHand}</div>

      {/* {displayHand.length > 0 && <h2>{calculateHand(displayHand)}</h2>} */}
    </div>
  )
}
export default Dealer2
