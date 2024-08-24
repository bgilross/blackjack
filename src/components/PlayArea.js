import Player from './Player'
import Dealer from './Dealer'
import AIPlayer from './AIPlayer'
import { useBlackjackContext } from '../utils/BlackjackContext'

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
      <section className="flex flex-wrap pa4">
        <div className="w-50 pa2">
          <Player />
        </div>
        <div className="w-50 pa2">
          <Dealer />
        </div>
      </section>

      {gameState.isGameOver && (
        <div className="tc mt4">
          <h1>GAME OVER</h1>
          <h1>{gameState.gameOutcome}</h1>
        </div>
      )}

      {/* AI Players in a responsive grid layout using only Tachyons */}
      <section
        className="pa4"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
        }}
      >
        {renderAIPlayerComponents().map((AIPlayerComponent, index) => (
          <div key={index} className="pa2">
            {AIPlayerComponent}
          </div>
        ))}
      </section>
    </div>
  )
}

export default PlayArea
