import Header from "./components/Header"
import PlayArea from "./components/PlayArea"
import GameSetupModal from "./components/GameSetupModal"
import DealAnimationLayer from "./components/DealAnimationLayer"
import { BlackjackProvider } from "./utils/BlackjackContext"

function App() {
	return (
		<div className="App">
			<BlackjackProvider>
				<div className="min-vh-100 max-vh-100 bg-dark-green pa1">
					<Header />
					<PlayArea />
					<GameSetupModal />
					<DealAnimationLayer />
				</div>
			</BlackjackProvider>
		</div>
	)
}

export default App
