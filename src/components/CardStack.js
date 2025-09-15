import React from "react"
import { useBlackjackContext } from "../utils/BlackjackContext"
import CardBack from "../images/cards/CardBack.png"

const CardStack = () => {
	const { deckCount } = useBlackjackContext()

	// render 3 layered backs for depth
	const layers = [0, 1, 2]

	return (
		<div className="card-stack">
			<div
				className="stack-visual"
				data-deck-stack
			>
				{layers.map((l) => (
					<img
						key={l}
						src={CardBack}
						alt="deck back"
						className={`stack-layer layer-${l}`}
					/>
				))}
			</div>
			<div className="stack-count">{deckCount} cards</div>
		</div>
	)
}

export default CardStack
