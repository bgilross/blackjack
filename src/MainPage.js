import { useState, useEffect } from 'react'
import uniqid from 'uniqid'

const MainPage = () => {
  const [deck, setDeck] = useState([])
  const [decks, setDecks] = useState([])

  useEffect(() => {
    console.log({ deck })
  }, [deck])

  const createDeck = () => {
    let tempDeck = []

    tempDeck.push(createSuit('hearts'))
    console.log(tempDeck)
    tempDeck.push(createSuit('spades'))
    console.log(tempDeck)
    tempDeck.push(createSuit('diamonds'))
    console.log(tempDeck)
    tempDeck.push(createSuit('clubs'))
    console.log(tempDeck)
    setDeck(tempDeck)

    console.log({ deck })
  }

  const createSuit = (suit) => {
    let newSuit = []
    // const newCard = {}\
    let counter = 13

    while (counter > 0) {
      newSuit.push({
        id: uniqid(),
        key: uniqid(),
        number: counter,
        suit: suit,
        played: false,
      })
      console.log({ newSuit })
      counter--
    }

    return newSuit
  }

  return (
    <div className="min-vh-100 bg-dark-green pa1">
      <div className="flex items-center justify-center">
        <h1 className="f-6 flex items-center justify-center">BLACKJACK</h1>
      </div>
      <div className="vh-75 flex flex-column pa4">
        Body
        <div className="ba bw1 br4 h-75 pa3 flex items-center justify-center">
          <label htmlFor="deckNumber">Deck Number</label>
          <input type="number" name="deckNumber" id="deckNumber" />
          <button onClick={createDeck}>Create Decks</button>
        </div>
      </div>
      <div className="ba bw1 f1 ma2">Footer</div>
    </div>
  )
}
export default MainPage
