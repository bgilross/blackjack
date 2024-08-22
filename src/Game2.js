import { useState } from 'react'
import Player2 from './components/Player2'
import { useBlackjack } from './utils/useBlackjack'
import Dealer2 from './components/Dealer2'

const Game2 = () => {
  const { currentHands, total, gameState, createDecks, deal, hit, deck } =
    useBlackjack()

  const [deckNumber, setDeckNumber] = useState(0)

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

      {/* AI Players Section */}
      <section className="flex justify-between items-start mt4">
        {/* AI Player 1 */}
        <div className="w-30 pa3 br2 bg-light-blue shadow-1">
          <h2 className="f3 mb3 tc">AI Player 1</h2>
          <div className="flex flex-wrap justify-center">
            {currentHands?.ai1?.map((card, index) => (
              <div
                key={index}
                className="w3 h4 ba b--black-10 br2 ma2 flex items-center justify-center bg-white"
              >
                {card}
              </div>
            ))}
          </div>
        </div>

        {/* AI Player 2 */}
        <div className="w-30 pa3 br2 bg-light-yellow shadow-1">
          <h2 className="f3 mb3 tc">AI Player 2</h2>
          <div className="flex flex-wrap justify-center">
            {currentHands?.ai2?.map((card, index) => (
              <div
                key={index}
                className="w3 h4 ba b--black-10 br2 ma2 flex items-center justify-center bg-white"
              >
                {card}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Game2
