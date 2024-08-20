import { useState } from 'react'
import Card from './components/Card'
import { createDecks, onHit, playCard, dealCards } from './utils/blackjacklogic'
import Dealer from './components/Dealer'
import Player from './components/Player'

const Game = () => {
  const [decks, setDecks] = useState([])
  const [deckNumber, setDeckNumber] = useState(0)
  const [playerHand, setPlayerHand] = useState([])
  const [dealerHand, setDealerHand] = useState([])
  const [isGameOver, setGameOver] = useState(false)
  const [isPlayerTurn, setPlayerTurn] = useState(true)

  const handleDeckNumberChange = (event) => {
    setDeckNumber(Number(event.target.value))
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
          <button onClick={() => createDecks({ deckNumber, setDecks })}>
            Create Decks
          </button>
        </div>
        <button
          onClick={() => {
            dealCards({ setPlayerHand, setDealerHand, decks, setDecks })
            console.log(playerHand)
            console.log(dealerHand)
          }}
        >
          DEAL
        </button>
      </div>
      <div className="vh-75 flex flex-column pa4">
        <div className="ba bw1 br4 h-75 pa3 flex flex-wrap flex-column items-center justify-between">
          <div className="dealer">
            <button onClick={() => console.log(dealerHand)}>log hand</button>
            <Dealer dealerHand={dealerHand} />
          </div>
          <div>
            <button onClick={() => console.log(decks)}>Log Deck</button>
          </div>
          <div className="player">
            <Player playerHand={playerHand} />
            <button onClick={() => console.log(playerHand)}>log hand</button>
            <button
              onClick={() => {
                console.log('Before onHit:', decks)
                if (!decks || decks.length === 0) {
                  console.error('Deck is undefined or empty before hitting.')
                  return
                }
                onHit({
                  playerHand,
                  setPlayerHand,
                  decks: [...decks],
                  setDecks,
                })
              }}
            >
              HIT
            </button>
            <button
              onClick={() => {
                console.log('Button next to  onHit:', decks)
              }}
            >
              Log again...
            </button>
          </div>
        </div>
      </div>
      <div className="ba bw1 f1 ma2">Footer</div>
    </div>
  )
}
export default Game
