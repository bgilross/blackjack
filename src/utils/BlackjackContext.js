import { createContext, useContext, useState } from 'react'
import uniqid from 'uniqid'

const BlackjackContext = createContext()

export const useBlackjackContext = () => useContext(BlackjackContext)

export const BlackjackProvider = ({ children }) => {
  const [deck, setDeck] = useState([])
  const [currentHands, setCurrentHands] = useState({
    dealer: [],
    player: [],
  })
  const [gameState, setGameState] = useState({
    isGameOver: false,
    isPlayerTurn: true,
    gameOutcome: '',
    turn: [1, 2],
    playerCount: 1,
  })
  const [playerList, setPlayerlist] = useState([])

  const createPlayers = (num) => {
    let newPlayers = []
    for (let i = 0; i < num; i++) {
      newPlayers.push(i)
    }
    newPlayers.map(
      (player, i) =>
        (newPlayers[i] = {
          name: 'player' + i,
          style: 'normal',
          hadTurn: false,
        })
    )
    setPlayerlist(newPlayers)
  }

  const createDecks = (deckNum) => {
    let newDecks = []
    for (let i = 0; i < deckNum; i++) {
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
    setDeck(newDecks)
  }

  const getCard = (tempDeck) => {
    const card = tempDeck[0]
    console.log(`card at index 0 is ${JSON.stringify(card)}`)
    const newDeck = tempDeck.slice(1)
    console.log(`newDeck after slice: ${newDeck.length} cards`)
    return { card, newDeck }
  }

  const deal = (num) => {
    console.log('Deal function Starting')
    if (deck.length < 1) {
      return
    }
    createPlayers(num)
    setGameState((prev) => ({
      ...prev,
      isGameOver: false,
      isPlayerTurn: true,
    }))
    setCurrentHands({})
    console.log(currentHands)
    let tempDeck = deck
    let tempCurrentHands = {}

    for (let i = 0; i < num; i++) {
      console.log('Player creation loop starting')
      tempCurrentHands[`player${i}`] = []
    }
    tempCurrentHands.player = []
    tempCurrentHands.dealer = []

    console.log(tempCurrentHands)
    console.log('After player creationg, before Dealing loop')

    //DEAL CARDS TWICE
    for (let i = 0; i < 2; i++) {
      //deal player
      let result = getCard(tempDeck)
      tempCurrentHands.player.push(result.card)
      tempDeck = result.newDeck
      //deal AI
      for (let i = 0; i < num; i++) {
        result = getCard(tempDeck)
        tempCurrentHands[`player${i}`].push(result.card)
        tempDeck = result.newDeck
      }
      //deal dealer
      result = getCard(tempDeck)
      tempCurrentHands.dealer.push(result.card)
      tempDeck = result.newDeck

      //and repeat
    }
    console.log('deal loop over tempCurrentHands: ', tempCurrentHands)

    setCurrentHands(tempCurrentHands)
    setDeck(tempDeck)
  }

  const handleCheckOutcome = () => {
    let playerScore = calculateHand(currentHands.player0)
    let dealerScore = calculateHand(currentHands.dealer)

    if (playerScore > dealerScore) {
      setGameState((prev) => ({
        ...prev,
        isGameOver: true,
        gameOutcome: 'Player beats Dealer!',
      }))
    }
    if (dealerScore > playerScore) {
      setGameState((prev) => ({
        ...prev,
        isGameOver: true,
        gameOutcome: 'Dealer beats Player!',
      }))
    }
    if (dealerScore === playerScore) {
      setGameState((prev) => ({
        ...prev,
        isGameOver: true,
        gameOutcome: 'Gross A tie!',
      }))
    }
  }

  const handleAITurn = () => {
    console.log('AI turn starting playerList.length = ', playerList.length)
    let tempDeck = deck
    let tempHands = currentHands

    for (let i = 0; i < playerList.length; i++) {
      let playerHand = tempHands[`player${i}`]
      let value = calculateHand(playerHand)
      while (value < 17) {
        console.log(`AI Player${i} HITS`)
        const { card, newDeck } = getCard(tempDeck)
        playerHand.push(card)
        tempDeck = newDeck
        value = calculateHand(playerHand)
      }
      if (value === 17) {
        console.log(`AI Player${i} holding at 17`)
        continue
      }
      if (value > 21) {
        console.log(`AI Player${i} BUSTS`)
        tempHands[`player${i}`].isBusted = true
        continue
      }
      console.log(`player${i} is still alive!`)
    }
    console.log('Handle AI turn end: setting currentHands to: ', tempHands)
    setCurrentHands(tempHands)
    setDeck(tempDeck)
    handleDealerTurn()
  }

  const handleDealerTurn = () => {
    console.log('dealer turn starting')
    setGameState((prev) => ({ ...prev, isPlayerTurn: false }))
    let tempDeck = deck
    let tempHand = currentHands.dealer
    let handValue = calculateHand(tempHand)

    while (handValue < 17) {
      const { card, newDeck } = getCard(tempDeck)
      tempHand.push(card)
      tempDeck = newDeck
      handValue = calculateHand(tempHand)
      console.log('end of while loop, handvalue: ', handValue)
    }
    if (handValue > 21) {
      setGameState((prev) => ({
        ...prev,
        isGameOver: true,
        gameOutcome: 'Dealer BUSTS. Player WINS!',
      }))

      return
    }

    handleCheckOutcome()
  }

  const hit = (player) => {
    console.log('deck at start of hit: ', deck)
    let tempHand = currentHands[player]
    let tempDeck = deck
    let handValue
    const { card, newDeck } = getCard(tempDeck)
    tempHand.push(card)
    handValue = calculateHand(tempHand)
    if (player !== 'dealer') {
      if (handValue > 21) {
        setGameState((prev) => ({
          ...prev,
          isGameOver: true,
          gameOutcome: 'Player BUSTS! Dealer WINS!',
        }))
      }
    }
    setCurrentHands((prev) => ({ ...prev, [player]: tempHand }))
    setDeck(newDeck)
  }

  const calculateHand = (hand) => {
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
        gameState,
        playerList,
        deal,
        hit,
        createDecks,
        calculateHand,
        handleDealerTurn,
        handleAITurn,
      }}
    >
      {children}
    </BlackjackContext.Provider>
  )
}
