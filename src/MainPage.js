import { useState, useEffect } from 'react'
import uniqid from 'uniqid'

const MainPage = () => {
  const [decks, setDecks] = useState([])
  const [currentCard, setCurrentCard] = useState(null)
  const [deckNumber, setDeckNumber] = useState(0)

  useEffect(() => {
    console.log({ decks })
  }, [decks])

  const handleDeckNumberChange = (event) => {
    setDeckNumber(Number(event.target.value))
  }

  const createDecks = () => {
    let newDecks = []

    for (let i = 0; i < deckNumber; i++) {
      const newDeck = createDeck()
      newDecks.push(...newDeck) // Spread and push to flatten the array here
    }
    setDecks(newDecks)
  }

  const createDeck = () => {
    const suits = ['hearts', 'spades', 'diamonds', 'clubs']
    return suits.flatMap((suit) =>
      Array.from({ length: 13 }, (_, i) => ({
        id: uniqid(),
        number: i + 1,
        suit: suit,
      }))
    )
  }

  const playCard = () => {
    if (decks.length > 0) {
      const index = Math.floor(Math.random() * decks.length)
      const card = decks[index]
      const newDeck = [...decks.slice(0, index), ...decks.slice(index + 1)]
      setDecks(newDeck)
      setCurrentCard(card)
    } else {
      const card = { number: 'Out of Cards', suit: 'please deal again' }
      setCurrentCard(card)
    }
  }

  return (
    <div className="min-vh-100 bg-dark-green pa1">
      <div className="flex items-center justify-center">
        <h1 className="f-6 flex items-center justify-center">BLACKJACK</h1>
      </div>
      <div className="vh-75 flex flex-column pa4">
        <div className="ba bw1 br4 h-75 pa3 flex flex-wrap items-center justify-center">
          <div className="w-100">
            <label htmlFor="deckNumber">Deck Number</label>
            <input
              type="number"
              value={deckNumber}
              onChange={handleDeckNumberChange}
              name="deckNumber"
              id="deckNumber"
            />
            <button onClick={createDecks}>Create Decks</button>
          </div>
          <button onClick={playCard}>Play Card</button>
          <div className="h4 w4 ba bw1">
            <p>Number: {currentCard?.number}</p>
            <p>Suit: {currentCard?.suit}</p>
          </div>
        </div>
      </div>
      <div className="ba bw1 f1 ma2">Footer</div>
    </div>
  )
}
export default MainPage
