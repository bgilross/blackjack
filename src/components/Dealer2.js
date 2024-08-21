import { useBlackjack } from '../utils/useBlackjack'
import Card from './Card'
import CardBack from '../images/cards/CardBack.png'

const Dealer2 = () => {
  const { currentHands, gameState } = useBlackjack()
  const { isGameOver, isPlayerTurn } = gameState

  return (
    <div className="w-30 pa3 br2 bg-light-red shadow-1">
      <h2 className="f3 mb3 tc">Dealer's Hand</h2>
      <div className="flex flex-wrap justify-center">
        {currentHands?.dealer?.map((card, index) => (
          <div
            key={index}
            className="w3 h4 ba b--black-10 br2 ma2 flex items-center justify-center bg-white"
          >
            {!isGameOver && isPlayerTurn ? (
              <img src={CardBack} alt="card back" height="150" width="100" />
            ) : (
              <Card card={card.card} suit={card.suit} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
export default Dealer2
