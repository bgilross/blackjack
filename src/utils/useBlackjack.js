import { useState } from 'react'
import uniqid from 'uniqid'

export const useBlackjack = () => {
  const [deck, setDeck] = useState([])
  const [currentHands, setCurrentHands] = useState({ dealer: [], player0: [] })
  const [total, setTotal] = useState({ player0: 0, dealer: 0, ties: 0 })
  const [gameState, setGameState] = useState({
    isGameOver: false,
    isPlayerTurn: true,
    gameOutcome: '',
    turn: [1, 2],
  })

  const createDecks = (num) => {
    console.log('Creating Decks Start')
    //create specified num of decks
    let newDecks = []
    for (let i = 0; i < num; i++) {
      const newDeck = createDeck()
      newDecks.push(...newDeck)
    }
    //shuffle deck(s)
    for (let i = 7; i > 0; i--) {
      for (let i = newDecks.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = newDecks[i]
        newDecks[i] = newDecks[j]
        newDecks[j] = temp
      }
    }
    console.log(newDecks)
    setDeck(newDecks)
    console.log(deck)
  }

  const getCard = () => {
    const card = deck[0]
    const newDeck = deck.slice(1)
    setDeck(newDeck)
    return card
  }

  const deal = () => {
    console.log('deal starts')
    const playerCount = gameState.turn.length
    for (let i = 0; i < playerCount * 2; i++) {
      console.log('deal loop starting: i = :', i)
      if (i === playerCount * 2 - 1 || playerCount - 1) {
        const card = getCard()
        console.log('dealer getting card', card)
        setCurrentHands((prev) => ({ ...prev, dealer: [...prev.dealer, card] }))
        console.log('dealer hand', currentHands.dealer)
      } else {
        console.log('player getting card')
        const card = getCard()
        setCurrentHands((prev) => ({
          ...prev,
          player0: [...prev.player0, card],
        }))
        console.log('player hand: ', currentHands.player0)
      }
    }
    console.log('After Deal, current Hands: ', currentHands)
  }

  const hit = (player) => {
    const card = getCard()
    setCurrentHands((prev) => ({ ...prev, [player]: [...prev[player], card] }))
  }

  const createDeck = () => {
    console.log('running createDeck')
    const suits = ['H', 'S', 'D', 'C']
    return suits.flatMap((suit) =>
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
        } else if (number < 14) {
          value = 10
        } else {
          value = 11
        }

        return {
          id: uniqid(),
          card: card,
          suit: suit,
          value: value,
        }
      })
    )
  }

  return {
    deck,
    currentHands,
    total,
    gameState,
    deal,
    hit,
    createDecks,
  }
}
