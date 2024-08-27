import { createContext, useContext, useState } from 'react'
import { createDecks, getCard } from './deckUtil'

const BlackjackContext = createContext()

export const useBlackjackContext = () => useContext(BlackjackContext)

export const BlackjackProvider = ({ children }) => {
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

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

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

  const handleCreateDecks = (num) => {
    createDecks(num)
  }

  const deal = (num) => {
    createPlayers(num)
    setGameState((prev) => ({
      ...prev,
      isGameOver: false,
      isPlayerTurn: true,
    }))
    setCurrentHands({})
    let tempCurrentHands = {}

    for (let i = 0; i < num; i++) {
      console.log('Player creation loop starting')
      tempCurrentHands[`player${i}`] = []
    }
    tempCurrentHands.player = []
    tempCurrentHands.dealer = []

    //DEAL CARDS TWICE
    for (let i = 0; i < 2; i++) {
      //deal player
      tempCurrentHands.player.push(getCard())
      //deal AI
      for (let i = 0; i < num; i++) {
        tempCurrentHands[`player${i}`].push(getCard())
      }
      //deal dealer
      tempCurrentHands.dealer.push(getCard())
      //and repeat once
    }

    setCurrentHands(tempCurrentHands)
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

  const handleAITurn = async () => {
    let tempHands = currentHands
    for (let i = 0; i < playerList.length; i++) {
      let playerHand = tempHands[`player${i}`]
      let value = calculateHand(playerHand)
      while (value < 17) {
        console.log(`AI Player${i} HITS`)
        playerHand.push(getCard())
        console.log('playerHand: ', playerHand)
        console.log('tempHands.player?: ', tempHands[`player${i}`])
        value = calculateHand(playerHand)
        setCurrentHands(tempHands)
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
    setCurrentHands(tempHands)
    handleDealerTurn()
  }

  const handleDealerTurn = async () => {
    setGameState((prev) => ({ ...prev, isPlayerTurn: false }))

    let tempHand = currentHands.dealer
    let handValue = calculateHand(tempHand)

    while (handValue < 17) {
      tempHand.push(getCard())

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
    let tempHand = currentHands[player]
    let handValue
    tempHand.push(getCard())
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

  return (
    <BlackjackContext.Provider
      value={{
        currentHands,
        gameState,
        playerList,
        deal,
        hit,
        calculateHand,
        handleDealerTurn,
        handleAITurn,
        handleCreateDecks,
      }}
    >
      {children}
    </BlackjackContext.Provider>
  )
}
