import { useState } from 'react'
import { useBlackjackContext } from '../utils/BlackjackContext'
import NumberInput from './NumberInput'

const Deck = () => {
  const { handleCreateDecks, deal } = useBlackjackContext()
  const [deckNumber, setDeckNumber] = useState(2)
  const [playerCount, setPlayerCount] = useState(4)

  return (
    <div>
      <div className="w-100">
        <label htmlFor="deckNumber">Deck Number</label>
        <NumberInput
          value={deckNumber}
          onChange={(e) => setDeckNumber(Number(e.target.value))}
        />
        <button onClick={() => handleCreateDecks(deckNumber)}>
          Create Decks
        </button>
      </div>
      <NumberInput
        value={playerCount}
        onChange={(e) => setPlayerCount(Number(e.target.value))}
      />
      <button onClick={() => deal(playerCount)}>DEAL</button>
    </div>
  )
}
export default Deck
