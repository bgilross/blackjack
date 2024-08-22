import { useState } from 'react'
import Player2 from './components/Player2'
import Dealer2 from './components/Dealer2'
import { useBlackjackContext } from './utils/BlackjackContext'
import NumberInput from './components/NumberInput'

const Game2 = () => {
  const {
    currentHands,
    gameState,
    createDecks,
    deal,
    hit,
    deck,
    calculateHand,
  } = useBlackjackContext()

  const [deckNumber, setDeckNumber] = useState(2)
  const [playerCount, setPlayerCount] = useState(1)

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
        <NumberInput
          value={deckNumber}
          onChange={(e) => setDeckNumber(Number(e.target.value))}
        />
        <button onClick={() => createDecks(deckNumber, playerCount)}>
          Create Decks
        </button>
        <button onClick={() => deal(playerCount)}>Deal</button>
      </section>
      <section>
        <NumberInput
          value={playerCount}
          onChange={(e) => setPlayerCount(Number(e.target.value))}
        />
      </section>
      <section className="flex justify-between items-start">
        {/* Player's Hand */}
        <div>
          <Player2 />
        </div>

        {/* Dealer's Hand */}
        <div>
          <Dealer2 />
        </div>
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
