import { useBlackjackContext } from '../utils/BlackjackContext'
import Card from './Card'
import Busted from '../images/bust.png'

const AIPlayer = ({ name }) => {
  const { currentHands, calculateHand } = useBlackjackContext()
  const hand = currentHands[name]
  const displayHand = currentHands[name]?.map((card) => (
    <Card key={card.id} card={card.card} suit={card.suit} />
  ))

  const busted = (
    <img
      src={Busted}
      alt="Busted"
      className="absolute top-0 left-0 z-5 w-75"
      style={{
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
      }}
    />
  )
  return (
    <div className="relative br2 shadow-1 pa3">
      <div className="f3 ma3">{name}'s Hand</div>
      <div className="flex justify-center">{displayHand}</div>
      {hand && <h1 className="f3 tc">{calculateHand(hand)}</h1>}
      {hand.isBusted && (
        <>
          <div className="absolute top-0 left-0 w-100 h-100 bg-black-70 z-4"></div>
          {busted}
        </>
      )}
    </div>
  )
}
export default AIPlayer
