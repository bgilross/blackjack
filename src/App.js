import './App.css'
import Game2 from './Game2'
import { BlackjackProvider } from './utils/BlackjackContext'

function App() {
  return (
    <div className="App">
      <BlackjackProvider>
        <Game2 />
      </BlackjackProvider>
    </div>
  )
}

export default App
