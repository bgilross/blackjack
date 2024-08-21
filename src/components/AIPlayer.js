import { useState } from 'react'
import Player from './Player'

const AIPlayer = ({ drawCard, name, initialHand }) => {
  //will be passed a function to run that returns the next card from the deck
  //handle own scoring logic here maybe?
  //
  const [hand, setHand] = useState(initialHand)
  const [score, setScore] = useState(0)

  const handleHit = () => {
    const card = drawCard()
    setHand((prev) => [...prev, card])
    setScore((prev) => prev + card.value)
  }

  return (
    <div>
      <Player playerHand={hand} />
    </div>
  )
}
export default AIPlayer
