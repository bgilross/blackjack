import Player from './Player'
import Dealer from './Dealer'
import AIPlayer from './AIPlayer'
import { useBlackjackContext } from '../utils/BlackjackContext'

const PlayArea2 = () => {
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

        <Player />
      </section>
      {gameState.isGameOver && (
        <div className="tc mt4">
          <h1>GAME OVER</h1>
          <h1>{gameState.gameOutcome}</h1>
        </div>
      )}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem',
        }}
      >
        {renderAIPlayerComponents().map((AIPlayerComponent, index) => (
          <div key={index} style={{ flex: '1 1 200px' }} className="pa2">
            {AIPlayerComponent}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlayArea2
