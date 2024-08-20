import { useState, useEffect } from 'react'
import Card from './components/Card'
import {
  createDecks,
  onHit,
  playCard,
  dealCards,
  calculateHand,
} from './utils/blackjacklogic'
import Dealer from './components/Dealer'
import Player from './components/Player'

const Game = () => {
  const [decks, setDecks] = useState([])
  const [deckNumber, setDeckNumber] = useState(0)
  const [playerHand, setPlayerHand] = useState([])
  const [dealerHand, setDealerHand] = useState([])
  const [isGameOver, setIsGameOver] = useState(false)
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [gameOutcome, setGameOutcome] = useState('')

  useEffect(() => {
    console.log('use effect starting: playerhand:', playerHand)
    if (playerHand.length > 0 && !isGameOver) {
      if (calculateHand({ hand: playerHand }) > 21) {
        setIsGameOver(true)
        setGameOutcome('Player BUSTS! Dealer WINS!')
      }
    }
  }, [playerHand])

  useEffect(() => {
    if (dealerHand.length > 0 && !isGameOver && !isPlayerTurn) {
      let handValue = calculateHand({ hand: dealerHand })
      if (handValue > 21) {
        setIsGameOver(true)
        setGameOutcome('Dealer BUSTS! Player WINS!')
      }
      if (handValue < 17) {
        onHit({ hand: dealerHand, setHand: setDealerHand, decks, setDecks })
        return
      }
      if (handValue > 16) handleCheckOutcome()
    }
  }, [dealerHand, isPlayerTurn])

  const handleCheckOutcome = () => {
    const playerScore = calculateHand({ hand: playerHand })
    const dealerScore = calculateHand({ hand: dealerHand })
    if (playerScore > dealerScore) {
      setIsGameOver(true)
      setGameOutcome('Player Beats Dealer!')
    } else if (playerScore < dealerScore) {
      setIsGameOver(true)
      setGameOutcome('Dealer Beats Player!')
    } else {
      setIsGameOver(true)
      setGameOutcome('Gross, a TIE!')
    }
  }

  const handleDeckNumberChange = (event) => {
    setDeckNumber(Number(event.target.value))
  }

  const handleCreateDecks = () => {
    console.log('running handlCreateDecks')
    createDecks({ deckNumber, setDecks })
  }

  const handleDealCards = () => {
    setIsGameOver(false)
    dealCards({ setPlayerHand, setDealerHand, decks, setDecks })
    setIsPlayerTurn(true)
  }

  const handlePlayerHit = () => {
    onHit({ hand: playerHand, setHand: setPlayerHand, decks, setDecks })
  }

  const handlePlayerStand = () => {
    setIsPlayerTurn(false)
  }

  const handleGameOver = () => {
    setIsGameOver(true)
  }

  return (
    <div className="min-vh-100 bg-dark-green pa1">
      <div className="flex flex-column items-center justify-center">
        <h1 className="f-6 flex items-center justify-center">BLACKJACK</h1>
        <div className="w-100">
          <label htmlFor="deckNumber">Deck Number</label>
          <input
            type="number"
            value={deckNumber}
            onChange={handleDeckNumberChange}
            name="deckNumber"
            id="deckNumber"
          />
          <button onClick={handleCreateDecks}>Create Decks</button>
        </div>
        <button onClick={handleDealCards}>DEAL</button>
      </div>
      <div className="vh-75 flex flex-column pa4">
        <div className="ba bw1 br4 h-100 pa3 flex flex-column items-center justify-between">
          <div className="dealer">
            <Dealer dealerHand={dealerHand} />
          </div>
          <div>
            {isGameOver ? (
              <div className="ba bw1 f2 ma2 flex flex-column items-center">
                <h2>Game Over</h2>
                <h3>{gameOutcome}</h3>
                <Player playerHand={playerHand} />
                <button onClick={handleDealCards}>Play Again</button>
              </div>
            ) : (
              <div className="player">
                <Player playerHand={playerHand} />
              </div>
            )}
            {!isGameOver && isPlayerTurn && (
              <div>
                <button onClick={handlePlayerHit}>HIT</button>
                <button onClick={handlePlayerStand}>STAND</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Game
