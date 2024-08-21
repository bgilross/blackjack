import { useState } from 'react'

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

  const createDeck = (num) => {
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
    setDeck(newDecks)
  }

  const getCard = () => {
    const card = deck[0]
    const newDeck = deck.slice(1)
    setDeck(newDeck)
    return card
  }

  const deal = () => {
    const playerCount = gameState.turn.length
    for (let i = 0; i < playerCount * 2; i++) {
      if (i === playerCount * 2 - 1 || playerCount - 1) {
        const card = getCard()
        setCurrentHands((prev) => ({ ...prev, dealer: [...prev.dealer, card] }))
      } else {
        const card = getCard()
        setCurrentHands((prev) => ({
          ...prev,
          player0: [...prev.player, card],
        }))
      }
    }
  }

  const hit = (player) => {
    const card = getCard()
    setCurrentHands((prev) => ({ ...prev, [player]: [...prev[player], card] }))
  }

  return {
    deck,
    currentHands,
    total,
    gameState,
    deal,
    hit,
    createDeck,
  }
}
