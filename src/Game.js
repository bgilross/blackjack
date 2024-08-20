import { useState } from 'react'
import Card from './components/Card'
import { createDecks, playCard } from './utils/blackjacklogic'

const Game = () => {
  const [decks, setDecks] = useState([])
  const [currentCard, setCurrentCard] = useState(null)
  const [deckNumber, setDeckNumber] = useState(0)

  const handleDeckNumberChange = (event) => {
    setDeckNumber(Number(event.target.value))
  }

  return (
    <div className="min-vh-100 bg-dark-green pa1">
      <div className="flex flex-column items-center justify-center">
        <h1 className="f-6 flex items-center justify-center">BLACKJACK</h1>
        <div className="w-100">
          <label htmlFor="deckNumber">Deck Number</label>
          <input
            type="number"
            value={deckNumber}
            onChange={handleDeckNumberChange}
            name="deckNumber"
            id="deckNumber"
          />
          <button onClick={() => createDecks({ deckNumber, setDecks })}>
            Create Decks
          </button>
        </div>
      </div>
      <div className="vh-75 flex flex-column pa4">
        <div className="ba bw1 br4 h-75 pa3 flex flex-wrap items-center justify-center">
          <button onClick={() => playCard({ decks, setCurrentCard, setDecks })}>
            Play Card
          </button>
          <div className="h4 w4 ba bw1">
            <p>Number: {currentCard?.card}</p>
            <p>Suit: {currentCard?.suit}</p>
            <Card card={currentCard?.card} suit={currentCard?.suit} />
          </div>
        </div>
      </div>
      <div className="ba bw1 f1 ma2">Footer</div>
    </div>
  )
}
export default Game
