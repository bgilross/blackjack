import { useBlackjackContext } from "../utils/BlackjackContext"

const Header = () => {
	const { openSetup } = useBlackjackContext()
	return (
		<header className="flex items-center justify-between mb3">
			<div>
				<h1 className="f4 fw7 ttu">Blackjack</h1>
				<p className="f6 mv0">Beat the dealer — get to 21 without busting.</p>
			</div>
			<div>
				<button onClick={() => openSetup()}>New Game</button>
			</div>
		</header>
	)
}
export default Header
