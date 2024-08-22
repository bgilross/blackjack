import { createContext, useContext, useState } from 'react'
import uniqid from 'uniqid'

const BlackjackContext = createContext()

export const useBlackjackContext = () => useContext(BlackjackContext)

export const BlackjackProvider = ({ children }) => {
  const [deck, setDeck] = useState([])
  const [currentHands, setCurrentHands] = useState({
    dealer: [],
    player0: [],
  })
  const [total, setTotal] = useState({ player0: 0, dealer: 0, ties: 0 })
  const [gameState, setGameState] = useState({
    isGameOver: false,
    isPlayerTurn: true,
    gameOutcome: '',
    turn: [1, 2],
    playerCount: 1,
  })

  const createDecks = (num) => {
    console.log('Creating Decks Start')
    let newDecks = []
    for (let i = 0; i < num; i++) {
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
    }
    console.log(newDecks)
    setDeck(newDecks)
  }

  const getCard = (tempDeck) => {
    const card = tempDeck[0]
    console.log(`card at index 0 is ${JSON.stringify(card)}`)
    const newDeck = tempDeck.slice(1)
    console.log(`newDeck after slice: ${newDeck.length} cards`)
    return { card, newDeck }
  }

  const deal = () => {
    setCurrentHands([])
    console.log('deal cards starting')
    let tempPlayerHand = []
    let tempDealerHand = []
    let tempDeck = deck

    for (let i = 0; i < 2; i++) {
      let result = getCard(tempDeck)
      tempPlayerHand.push(result.card)
      tempDeck = result.newDeck

      result = getCard(tempDeck)
      tempDealerHand.push(result.card)
      tempDeck = result.newDeck
    }

    setCurrentHands((prev) => ({
      ...prev,
      dealer: tempDealerHand,
      player0: tempPlayerHand,
    }))
    setDeck(tempDeck)
  }

  const hit = (player) => {
    console.log('HIT running player = :', player)
    let tempHand = currentHands[player]
    let tempDeck = deck
    const { card, newDeck } = getCard(tempDeck)
    // setCurrentHands((prev) => ({ ...prev, [player]: [...prev[player], card] }))
    tempHand.push(card)
    setDeck(newDeck)
    let handValue = calculateHand(tempHand)
    console.log(
      'during hit before score check. handvalue: ',
      handValue,
      tempHand
    )
    if (handValue > 21) {
      setGameState((prev) => ({
        ...prev,
        isGameOver: true,
        gameOutcome: 'Player BUSTS! Dealer WINS!',
      }))
    }
    setCurrentHands((prev) => ({ ...prev, [player]: tempHand }))
  }

  const calculateHand = (hand) => {
    console.log('Calculate hand starting hand: ', hand)
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

  return (
    <BlackjackContext.Provider
      value={{
        deck,
        currentHands,
        total,
        gameState,
        deal,
        hit,
        createDecks,
        calculateHand,
      }}
    >
      {children}
    </BlackjackContext.Provider>
  )
}
