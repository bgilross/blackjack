import uniqid from 'uniqid'

export function createDecks({ deckNumber, setDecks }) {
  let newDecks = []
  console.log(newDecks)

  for (let i = 0; i < deckNumber; i++) {
    const newDeck = createDeck()
    newDecks.push(...newDeck)
  }

  for (let i = 7; i > 0; i--) {
    for (let i = newDecks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = newDecks[i]
      newDecks[i] = newDecks[j]
      newDecks[j] = temp
    }
    console.log(newDecks)
  }
  setDecks(newDecks)
}

export function playCard(decks, setCurrentCard, setDecks) {
  if (decks.length > 0) {
    const card = decks[0]
    const newDeck = [...decks.slice(0, 0), ...decks.slice(1)]
    setDecks(newDeck)
    setCurrentCard(card)
  } else {
    const card = { number: 'Out of Cards', suit: 'please deal again' }
    setCurrentCard(card)
  }
}

const createDeck = () => {
  const suits = ['H', 'S', 'D', 'C']
  return suits.flatMap((suit) =>
    Array.from({ length: 13 }, (_, i) => {
      let number = i + 1

      // Map 11, 12, 13, and 1 to J, Q, K, and A respectively
      let card
      if (number === 1) {
        card = 'A'
      } else if (number === 11) {
        card = 'J'
      } else if (number === 12) {
        card = 'Q'
      } else if (number === 13) {
        card = 'K'
      } else {
        card = number.toString()
      }

      let value
      if (number < 11) {
        value = number
      } else if (number < 14) {
        value = 10
      } else {
        value = 11
      }

      return {
        id: uniqid(),
        card: card, // This will now be 'A', 'J', 'Q', 'K', or '2'-'10'
        suit: suit,
        value: value,
      }
    })
  )
}

export function playRandomCard({ decks, setCurrentCard, setDecks }) {
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
