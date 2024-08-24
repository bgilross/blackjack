import Header from './components/Header'
import Deck from './components/Deck'
import PlayArea from './components/PlayArea'
import PlayArea2 from './components/PlayArea2'

const Game2 = () => {
  return (
    <div className="min-vh-100 max-vh-100 bg-dark-green pa1">
      <Header />
      <Deck />
      <PlayArea2 />
    </div>
  )
}

export default Game2
