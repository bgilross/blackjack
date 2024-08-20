import uniqid from 'uniqid'

export function onHit({ hand, setHand, setDecks }) {
  setDecks((prevDecks) => {
    if (!prevDecks || prevDecks.length === 0) {
      console.error('Deck is empty or undefined')
      return prevDecks
    }

    const card = prevDecks[0]
    const newDeck = prevDecks.slice(1)
    const newHand = [...hand, card]
    setHand(newHand)
    return newDeck
  })
}

export function calculateHand({ hand }) {
  let value = 0
  let aceCount = 0

  hand.forEach((card) => {
    if (card.card === 'A') {
      aceCount += 1
      value += 11
    } else {
      value += card.value
    }
  })

  while (value > 21 && aceCount > 0) {
    value -= 10
    aceCount -= 1
  }

  return value
}
export function createDecks({ deckNumber, setDecks }) {
  console.log('running createDecks decknumber:', deckNumber)
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

export function dealCards({ setPlayerHand, setDealerHand, decks, setDecks }) {
  console.log('deal cards starting')

  let newPlayerHand = []
  let newDealerHand = []
  let updatedDeck = decks

  let result = playCard2(updatedDeck)
  newPlayerHand.push(result.card)
  updatedDeck = result.newDeck
  console.log(updatedDeck)
  result = playCard2(updatedDeck)
  newDealerHand.push(result.card)
  updatedDeck = result.newDeck

  result = playCard2(updatedDeck)
  newPlayerHand.push(result.card)
  updatedDeck = result.newDeck

  result = playCard2(updatedDeck)
  newDealerHand.push(result.card)
  updatedDeck = result.newDeck

  setPlayerHand(newPlayerHand)
  setDealerHand(newDealerHand)
  setDecks(updatedDeck)

  console.log('deal cards completed')
  console.log('Player Hand:', newPlayerHand)
  console.log('Dealer Hand:', newDealerHand)
}

export function playCard2(decks) {
  console.log('play cards starting')
  if (decks.length > 0) {
    console.log(`deck length > 0 check ${decks.length}`)
    const card = decks[0]
    console.log(`card at index 0 is ${JSON.stringify(card)}`)
    const newDeck = decks.slice(1)
    console.log(`newDeck after slice: ${newDeck.length} cards`)
    return { card, newDeck }
  } else {
    const card = { number: 'Out of Cards', suit: 'please deal again' }
    return { card, newDeck: decks }
  }
}

// export function onHit(hand, setHand, decks2, setDecks) {
//   console.log('onHit called with decks:', decks2)

//   let updatedDeck = decks2

//   //   let result = playCard2(updatedDeck)
//   //   newHand.push(result.card)
//   //   updatedDeck = result.newDeck

//   //   setHand(newHand)
//   //   setDecks(updatedDeck)
//   if (!decks2 || !Array.isArray(decks2)) {
//     console.error('Deck is undefined or not an array')
//     return
//   }

//   if (decks2.length === 0) {
//     console.error('Deck is empty')
//     return
//   }

//   if (updatedDeck.length > 0) {
//     console.log('deck length > 0 ')
//     const card = updatedDeck[0]
//     const newDeck = updatedDeck.slice(1)
//     const newHand = [...hand, card]
//     setDecks(newDeck)
//     setHand(newHand)
//   }
// }

const createDeck = () => {
  console.log('running createDeck')
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
