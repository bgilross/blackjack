import React from "react"
import cards from "../images/cards"
import CardBack from "../images/cards/CardBack.png"

const Card = ({ card, isFaceDown }) => {
	// If card is a flag object (like {isBusted: true}) just render nothing
	if (!card || card.isBusted) return null

	const faceDown = isFaceDown || card.isFaceDown
	const cardKey = `${card.card}${card.suit}`

	return (
		<div
			className={`card-container ${faceDown ? "is-down" : "is-up"}`}
			style={{ width: "10rem", height: "15rem" }}
		>
			<div className="card-inner">
				<div className="card-front">
					<img
						src={cards[cardKey]}
						alt={`${card.card} of ${card.suit}`}
					/>
				</div>
				<div className="card-back">
					<img
						src={CardBack}
						alt="card back"
					/>
				</div>
			</div>
		</div>
	)
}

export default Card
