import { useState, useEffect } from 'react'
import {
  createDecks,
  onHit,
  dealCards,
  calculateHand,
} from './utils/blackjacklogic'
import Dealer from './components/Dealer'
import Player from './components/Player'
import Deck from './components/Deck'
import { Scoreboard } from './components/Scoreboard'

const Game = () => {
  const [decks, setDecks] = useState([])
  const [deckNumber, setDeckNumber] = useState(0)
  const [playerHand, setPlayerHand] = useState([])
  const [dealerHand, setDealerHand] = useState([])
  const [isGameOver, setIsGameOver] = useState(false)
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [gameOutcome, setGameOutcome] = useState('')
  const [playerScore, setPlayerScore] = useState(null)
  const [dealerScore, setDealerScore] = useState(null)
  const [total, setTotal] = useState({
    dealerScore: 0,
    playerScore: 0,
    ties: 0,
  })
  const handleScore = (name) => {
    setTotal((prev) => ({
      ...prev,
      [name + 'Score']: prev[name + 'Score'] + 1,
    }))
  }
  //check PLAYER score on hand update
  useEffect(() => {
    console.log(
      `Player useEffect starting: HAND: ${JSON.stringify(playerHand)}`
    )
    if (playerHand.length < 1) {
      return
    } else {
      let playerScore
      playerScore = calculateHand({ hand: playerHand })
      setPlayerScore(playerScore)
      if (playerHand.length > 0 && !isGameOver) {
        if (playerScore > 21) {
          setIsGameOver(true)
          setGameOutcome('Player BUSTS! Dealer WINS!')
          handleScore('dealer')
        }
      }
    }
  }, [playerHand])

  //handle DEALER's Turn and score checking
  useEffect(() => {
    let handValue
    if (dealerHand.length > 0) {
      handValue = calculateHand({ hand: dealerHand })
      setDealerScore(handValue)
    }
    if (dealerHand.length > 0 && !isGameOver && !isPlayerTurn) {
      if (handValue > 21) {
        setIsGameOver(true)
        setGameOutcome('Dealer BUSTS! Player WINS!')
        handleScore('player')
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
      handleScore('player')
    } else if (playerScore < dealerScore) {
      setIsGameOver(true)
      setGameOutcome('Dealer Beats Player!')
      handleScore('dealer')
    } else {
      setIsGameOver(true)
      setGameOutcome('Gross, a TIE!')
      setTotal((prevTotal) => prevTotal.ties++)
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

  return (
    <div className="min-vh-100 bg-dark-green pa1">
      <Scoreboard total={total} />
      {/* <button onClick={handleScore('dealer')}>Score Dealer</button> */}
      <div className="HEADER flex flex-column items-center justify-center">
        <h1 className="f-6 flex items-center justify-center">BLACKJACK</h1>
        <Deck
          handleDealCards={handleDealCards}
          handleDeckNumberChange={handleDeckNumberChange}
          handleCreateDecks={handleCreateDecks}
          deckNumber={deckNumber}
        />
      </div>
      <div className="vh-75 flex flex-column pa4">
        <div className="ba bw1 br4 h-100 pa3 flex flex-column items-center justify-between">
          <div className="dealer">
            <Dealer
              dealerHand={dealerHand}
              isGameOver={isGameOver}
              isPlayerTurn={isPlayerTurn}
              dealerScore={dealerScore}
            />
          </div>

          <div>
            <h1>{playerScore}</h1>
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
