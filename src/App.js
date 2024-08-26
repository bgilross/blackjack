import Header from './components/Header'
import PlayArea from './components/PlayArea'
import { BlackjackProvider } from './utils/BlackjackContext'

function App() {
  return (
    <div className="App">
      <BlackjackProvider>
        <div className="min-vh-100 max-vh-100 bg-dark-green pa1">
          <Header />
          <PlayArea />
        </div>
      </BlackjackProvider>
    </div>
  )
}

export default App
