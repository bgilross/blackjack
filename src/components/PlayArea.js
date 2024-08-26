import Player from './Player'
import Dealer from './Dealer'
import AIPlayer from './AIPlayer'
import { useBlackjackContext } from '../utils/BlackjackContext'
import Deck from './Deck'

const PlayArea = () => {
  const { playerList, gameState } = useBlackjackContext()

  const renderAIPlayerComponents = () => {
    const players = []
    for (let i = 0; i < playerList.length; i++) {
      players.push(`player${i}`)
    }
    return players.map((player) => <AIPlayer key={player} name={player} />)
  }

  return (
    <div>
      {/* Player and Dealer in a horizontal flexbox */}
      <section className="flex justify-center items-center justify-around pa4">
        <Dealer />
        <Deck />
        <Player />
      </section>
      {gameState.isGameOver && (
        <div className="tc mt4">
          <h1>GAME OVER</h1>
          <h1>{gameState.gameOutcome}</h1>
        </div>
      )}
      <div className="flex flex-wrap justify-center pa3">
        {renderAIPlayerComponents().map((AIPlayerComponent, index) => (
          <div key={index} className="pa2">
            {AIPlayerComponent}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlayArea
