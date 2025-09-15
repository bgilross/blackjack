import { useBlackjackContext } from "../utils/BlackjackContext"
import Card from "./Card"
import Busted from "../images/bust.png"

const AIPlayer = ({ name }) => {
	const { currentHands, calculateHand, gameState } = useBlackjackContext()
	const hand = currentHands[name]
	const isActive = gameState.activeAI === name

	const displayHand = hand?.map((card) => (
		<Card
			key={card.id}
			card={card}
		/>
	))

	return (
		<div className="relative br2 shadow-1 pa3">
			<div className="f3 ma3">
				{name}'s Hand {isActive && <span className="ml2">(Thinking...)</span>}
			</div>
			<div
				className="flex justify-center"
				data-hand={name}
			>
				{displayHand}
			</div>
			{hand && <h1 className="f3 tc">{calculateHand(hand)}</h1>}
			{hand?.isBusted && (
				<>
					<div className="absolute top-0 left-0 w-100 h-100 bg-black-70 z-4"></div>
					<img
						src={Busted}
						alt="Busted"
						className="absolute top-0 left-0 z-5 w-75"
						style={{
							transform: "translate(-50%, -50%)",
							top: "50%",
							left: "50%",
							opacity: 0.8,
							pointerEvents: "none",
						}}
					/>
				</>
			)}
		</div>
	)
}
export default AIPlayer
