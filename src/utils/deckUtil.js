import uniqid from 'uniqid'

let deck = []

export const createDecks = (num) => {
  deck = []
  for (let i = num; i > 0; i--) {
    deck = createDeck()
    deck.push(...deck)
  }
  shuffleDeck()
  console.log('create decks and shuffle done: deck: ', deck)
}

const createDeck = () => {
  const suits = ['H', 'S', 'D', 'C']
  let newDeck = suits.flatMap((suit) =>
    Array.from({ length: 13 }, (_, i) => {
      let number = i + 1
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
      } else {
        value = 10
      }

      return {
        id: uniqid(),
        card: card,
        suit: suit,
        value: value,
      }
    })
  )
  console.log('create deck done, new deck = ', newDeck)
  return newDeck
}

export const getCard = () => {
  console.log('getting card: deck is: ', deck)

  const card = deck[0]
  console.log('card is: ', card)
  deck = deck.slice(1)
  return card
}

const shuffleDeck = (num) => {
  for (let i = num; i > 0; i--) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = deck[i]
      deck[i] = deck[j]
      deck[j] = temp
    }
  }
}
