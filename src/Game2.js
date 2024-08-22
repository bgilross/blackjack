import { useState } from 'react'
import Player2 from './components/Player2'
import { useBlackjack } from './utils/useBlackjack'
import Dealer2 from './components/Dealer2'
import { useBlackjackContext } from './utils/BlackjackContext'

const Game2 = () => {
  const { currentHands, total, gameState, createDecks, deal, hit, deck } =
    useBlackjackContext()

  const [deckNumber, setDeckNumber] = useState(2)

  return (
    <div className="pa4 mw7 center">
      <header className="tc mb4">
        <h1 className="f2 fw7 ttu tracked">Blackjack</h1>
        <p className="f4 fw4">
          Try to beat the dealer! Get as close to 21 as possible without going
          over.
        </p>
      </header>
      <section>
        <input
          type="number"
          value={deckNumber}
          onChange={(e) => setDeckNumber(Number(e.target.value))}
          name="deckNumber"
          id="deckNumber"
        />
        <button onClick={() => createDecks(deckNumber)}>Create Decks</button>
        <button onClick={() => deal()}>Deal</button>
      </section>
      <section className="flex justify-between items-start">
        {/* Player's Hand */}
        <Player2 />
        <button
          onClick={() => {
            console.log(deck)
          }}
        >
          Show Decks
        </button>
        <button
          onClick={() => {
            console.log(currentHands)
          }}
        >
          Show CurrentHands
        </button>
        <button
          onClick={() => {
            console.log(gameState)
          }}
        >
          Show GameState
        </button>
        {/* Dealer's Hand */}
        <Dealer2 />
      </section>
      {gameState.isGameOver && (
        <div>
          <h1>GAME OVER</h1>
          <h1>{gameState.gameOutcome}</h1>
        </div>
      )}
    </div>
  )
}

export default Game2
