import { useBlackjack } from '../utils/useBlackjack'
import Card from './Card'

const Player2 = () => {
  const { currentHands, hit } = useBlackjack()
  return (
    <div className="w-30 pa3 br2 bg-light-green shadow-1">
      <h2 className="f3 mb3 tc">Your Hand</h2>
      <div className="flex flex-wrap justify-center">
        {currentHands?.player?.map((card, index) => (
          <div
            key={index}
            className="w3 h4 ba b--black-10 br2 ma2 flex items-center justify-center bg-white"
          >
            <Card card={card.card} suit={card.suit} />
            <h1> card goes here</h1>
          </div>
        ))}
      </div>
      <button
        onClick={() => hit('player0')}
        className="mt3 w-100 pv2 ph3 bg-dark-green white br2 grow pointer"
      >
        Hit
      </button>
    </div>
  )
}
export default Player2
