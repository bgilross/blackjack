import React, { useState, useEffect } from "react"
import { useBlackjackContext } from "../utils/BlackjackContext"

const GameSetupModal = () => {
	const { showSetup, closeSetup, startGame } = useBlackjackContext()
	const [deckNumber, setDeckNumber] = useState(2)
	const [playerCount, setPlayerCount] = useState(1)

	useEffect(() => {
		if (showSetup) {
			setDeckNumber(2)
			setPlayerCount(1)
		}
	}, [showSetup])

	if (!showSetup) return null

	const deckOptions = [1, 2, 4, 6]
	const playerOptions = [1, 2, 3, 4, 5, 6]

	return (
		<div className="setup-overlay">
			<div className="setup-modal">
				<h2 className="modal-title">New Game</h2>

				<div className="form-row">
					<label className="form-label">Decks</label>
					<select
						className="select"
						value={deckNumber}
						onChange={(e) => setDeckNumber(Number(e.target.value))}
					>
						{deckOptions.map((d) => (
							<option
								key={d}
								value={d}
							>
								{d} deck{d > 1 ? "s" : ""}
							</option>
						))}
					</select>
				</div>

				<div className="form-row">
					<label className="form-label">Players</label>
					<select
						className="select"
						value={playerCount}
						onChange={(e) => setPlayerCount(Number(e.target.value))}
					>
						{playerOptions.map((p) => (
							<option
								key={p}
								value={p}
							>
								{p} player{p > 1 ? "s" : ""}
							</option>
						))}
					</select>
				</div>

				<div className="form-actions">
					<button
						className="btn btn-ghost"
						onClick={() => closeSetup()}
					>
						Cancel
					</button>
					<button
						className="btn btn-primary"
						onClick={() => startGame(deckNumber, playerCount)}
					>
						Start Game
					</button>
				</div>
			</div>
		</div>
	)
}

export default GameSetupModal
