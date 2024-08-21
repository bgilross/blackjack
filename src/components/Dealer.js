import Card from './Card'
import CardBack from '../images/cards/CardBack.png'
import { useState } from 'react'

const Dealer = ({ dealerHand, isGameOver, isPlayerTurn, dealerScore }) => {
  const [showScore, setShowScore] = useState(false)

  const displayHand = dealerHand.map((card, index) => {
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
    <div className="flex flex-column">
      <div>{displayHand}</div>
      {!isGameOver && (
        <button
          onClick={() => {
            setShowScore((prev) => !prev)
          }}
        >
          Show Score
        </button>
      )}

      {showScore && <h1>{dealerScore}</h1>}
      {!showScore && isGameOver && <h1>{dealerScore}</h1>}
    </div>
  )
}
export default Dealer
