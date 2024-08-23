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
      <section className="flex justify-between items-start">
        <Player />
        <Dealer />
      </section>
      {gameState.isGameOver && (
        <div>
          <h1>GAME OVER</h1>
          <h1>{gameState.gameOutcome}</h1>
        </div>
      )}
      <section className="flex justify-between items-start flex-wrap">
        {renderAIPlayerComponents()}
      </section>
    </div>
  )
}
export default PlayArea
