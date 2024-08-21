import Player2 from './components/Player2'
import { useBlackjack } from './utils/useBlackjack'

const Game2 = () => {
  const { currentHands, total, gameState, createDeck, deal, hit } =
    useBlackjack()

  return (
    <div className="pa4 mw7 center">
      <header className="tc mb4">
        <h1 className="f2 fw7 ttu tracked">Blackjack</h1>
        <p className="f4 fw4">
          Try to beat the dealer! Get as close to 21 as possible without going
          over.
        </p>
      </header>

      <section className="flex justify-between items-start">
        {/* Player's Hand */}
        <Player2 />

        {/* Dealer's Hand */}
        <div className="w-30 pa3 br2 bg-light-red shadow-1">
          <h2 className="f3 mb3 tc">Dealer's Hand</h2>
          <div className="flex flex-wrap justify-center">
            {currentHands?.dealer?.map((card, index) => (
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
