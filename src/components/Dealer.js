import Card from "./Card"
import { useBlackjackContext } from "../utils/BlackjackContext"

const Dealer = () => {
	const { currentHands, gameState, calculateHand } = useBlackjackContext()

	const displayHand = currentHands?.dealer?.map((card, index) => {
		if (!card) return null
		return (
			<Card
				key={card.id || index}
				card={card}
				isFaceDown={card.isFaceDown}
			/>
		)
	})

	return (
		<div>
			<div className="pa3 br2 bg-light-red shadow-1">
				<h2 className="f3 mb3 tc">Dealer's Hand</h2>
				<div
					className="flex justify-center"
					data-hand="dealer"
				>
					{displayHand}
				</div>
			</div>
			{gameState.isGameOver && currentHands.dealer && (
				<h1>{calculateHand(currentHands.dealer)}</h1>
			)}
		</div>
	)
}
export default Dealer
