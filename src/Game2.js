import { useState } from 'react'
import Player from './components/Player'
import Dealer from './components/Dealer'
import { useBlackjackContext } from './utils/BlackjackContext'
import NumberInput from './components/NumberInput'
import AIPlayer from './components/AIPlayer'

const Game2 = () => {
  const { currentHands, gameState, createDecks, deal } = useBlackjackContext()

  const [deckNumber, setDeckNumber] = useState(2)
  const [playerCount, setPlayerCount] = useState(4)

  const renderAIPlayerComponents = () => {
    if (!currentHands) {
      return
    }
    const players = []
    for (let i = 0; i < playerCount; i++) {
      players.push(`player${i}`)
    }
    return players.map((player) => <AIPlayer key={player} name={player} />)
  }

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
      <section className="flex justify-center items-center">
        <h3>AI Players</h3>
        <NumberInput
          value={playerCount}
          onChange={(e) => setPlayerCount(Number(e.target.value))}
        />
      </section>
      <section className="flex justify-between items-start">
        <div>
          <Player />
        </div>
        <div>
          <Dealer />
        </div>
      </section>
      {gameState.isGameOver && (
        <div>
          <h1>GAME OVER</h1>
          <h1>{gameState.gameOutcome}</h1>
        </div>
      )}
      <section>{renderAIPlayerComponents()}</section>
    </div>
  )
}

export default Game2
