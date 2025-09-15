import { createContext, useContext, useState, useRef, useEffect } from "react"
import { createDecks, getCard, getDeckSize } from "./deckUtil"
import CardBack from "../images/cards/CardBack.png"

const BlackjackContext = createContext()

export const useBlackjackContext = () => useContext(BlackjackContext)

export const BlackjackProvider = ({ children }) => {
	const [currentHands, setCurrentHands] = useState({
		dealer: [],
		player: [],
	})
	const [gameState, setGameState] = useState({
		isGameOver: false,
		isPlayerTurn: true,
		gameOutcome: "",
		turn: [1, 2],
		playerCount: 1,
		activeAI: null,
	})
	// show the setup modal on first visit
	const [showSetup, setShowSetup] = useState(true)
	const [playerList, setPlayerlist] = useState([])
	const [deckCount, setDeckCount] = useState(0)
	const [animationRequest, setAnimationRequest] = useState(null)
	const animationResolverRef = useRef(null)

	// keep a ref mirror of currentHands so async loops read fresh values
	const currentHandsRef = useRef(currentHands)
	useEffect(() => {
		currentHandsRef.current = currentHands
	}, [currentHands])

	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

	// small helper to return a random delay for AI thinking
	const randomDelay = (min = 400, max = 1200) =>
		Math.floor(Math.random() * (max - min + 1)) + min

	// helper to deal a single card and return it (so caller can await animations)
	const dealOneCardTo = async (
		target,
		faceDown = false,
		animationDelay = 350
	) => {
		// take the card from the deck
		const card = getCard()

		// animate a card back from the stack to the target first
		if (typeof animateDeal === "function") {
			// request animation and wait for it to finish
			await animateDeal({
				from: "[data-deck-stack]",
				to: `[data-hand="${target}"]`,
				img: CardBack,
				duration: animationDelay,
			})
		}

		// attach face-down flag so Card/Dealer components can render/back or flip
		const cardWithFlags = { ...card, isFaceDown: faceDown }
		setCurrentHands((prev) => ({
			...prev,
			[target]: [...(prev[target] || []), cardWithFlags],
		}))
		// update remaining deck count
		setDeckCount(getDeckSize())
		// small pause after deal
		await delay(80)
		return cardWithFlags
	}

	// request an animation; returns a promise that resolves when DealAnimationLayer finishes
	const animateDeal = (payload) => {
		return new Promise((resolve) => {
			animationResolverRef.current = resolve
			setAnimationRequest(payload)
		})
	}

	const resolveAnimation = () => {
		if (animationResolverRef.current) {
			animationResolverRef.current()
			animationResolverRef.current = null
		}
		setAnimationRequest(null)
	}

	const createPlayers = (num) => {
		let newPlayers = []
		for (let i = 0; i < num; i++) {
			newPlayers.push(i)
		}
		newPlayers.map(
			(player, i) =>
				(newPlayers[i] = {
					name: "player" + i,
					style: "normal",
					hadTurn: false,
				})
		)
		setPlayerlist(newPlayers)
	}

	const handleCreateDecks = (num) => {
		createDecks(num)
		setDeckCount(getDeckSize())
	}

	const openSetup = () => setShowSetup(true)
	const closeSetup = () => setShowSetup(false)

	const startGame = async (deckNum = 2, playerCount = 1) => {
		// create decks and start deal; close modal
		handleCreateDecks(deckNum)
		closeSetup()
		await deal(playerCount)
	}

	const deal = async (num) => {
		// initialize players and state
		createPlayers(num)
		setGameState((prev) => ({ ...prev, isGameOver: false, isPlayerTurn: true }))
		setCurrentHands({})

		// initialize empty hands
		const initialHands = { player: [], dealer: [] }
		for (let i = 0; i < num; i++) {
			initialHands[`player${i}`] = []
		}
		setCurrentHands(initialHands)

		// Deal cards in sequence: player, AIs, dealer - twice
		for (let round = 0; round < 2; round++) {
			// to human player
			await dealOneCardTo("player", false, 350)

			// to each AI player
			for (let i = 0; i < num; i++) {
				// standard: AI/player cards are face-up
				await dealOneCardTo(`player${i}`, false, 350)
			}

			// to dealer - standard rule: second card (round === 1) is face down
			const dealerFaceDown = round === 1
			await dealOneCardTo("dealer", dealerFaceDown, 350)
		}
	}

	const handleCheckOutcome = () => {
		let playerScore = calculateHand(currentHandsRef.current.player0 || [])
		let dealerScore = calculateHand(currentHandsRef.current.dealer || [])

		if (playerScore > dealerScore) {
			setGameState((prev) => ({
				...prev,
				isGameOver: true,
				gameOutcome: "Player beats Dealer!",
			}))
		}
		if (dealerScore > playerScore) {
			setGameState((prev) => ({
				...prev,
				isGameOver: true,
				gameOutcome: "Dealer beats Player!",
			}))
		}
		if (dealerScore === playerScore) {
			setGameState((prev) => ({
				...prev,
				isGameOver: true,
				gameOutcome: "Gross A tie!",
			}))
		}
	}

	const handleAITurn = async () => {
		// run AI turns sequentially, with a small randomized thinking delay
		for (let i = 0; i < playerList.length; i++) {
			// mark this AI as active so components can show a thinking state
			setGameState((prev) => ({ ...prev, activeAI: `player${i}` }))
			const key = `player${i}`

			// small thinking pause before this AI acts
			await delay(randomDelay(300, 900))

			// repeatedly hit until 17 or bust
			let value = calculateHand(currentHandsRef.current[key] || [])
			while (value < 17) {
				// AI decides to hit, add a card and wait for animation
				await dealOneCardTo(key, false, 450)
				value = calculateHand(currentHandsRef.current[key] || [])
				// small pause between hits to feel natural
				await delay(randomDelay(200, 450))
			}

			// mark busted if needed - set a flag on the hand array itself (avoid inserting sentinel objects)
			if (value > 21) {
				setCurrentHands((prev) => {
					const existing = (prev[key] || []).slice()
					existing.isBusted = true
					return {
						...prev,
						[key]: existing,
					}
				})
			}
		}

		// clear active AI after all players finished
		setGameState((prev) => ({ ...prev, activeAI: null }))

		// after all AIs have acted, run dealer
		await handleDealerTurn()
	}

	const handleDealerTurn = async () => {
		// reveal dealer's face-down card first
		setGameState((prev) => ({ ...prev, isPlayerTurn: false }))

		// reveal second card if it's face down
		setCurrentHands((prev) => {
			const dealer = (prev.dealer || []).map((c) => ({ ...c }))
			const updated = dealer.map((c) => ({ ...c, isFaceDown: false }))
			return { ...prev, dealer: updated }
		})
		// give a small pause for reveal animation
		await delay(600)

		// now draw until 17
		let handValue = calculateHand(currentHandsRef.current.dealer || [])
		while (handValue < 17) {
			await dealOneCardTo("dealer", false, 450)
			handValue = calculateHand(currentHandsRef.current.dealer || [])
			await delay(300)
		}

		if (handValue > 21) {
			setGameState((prev) => ({
				...prev,
				isGameOver: true,
				gameOutcome: "Dealer BUSTS. Player WINS!",
			}))
			return
		}

		handleCheckOutcome()
	}

	// use dealOneCardTo for animated hits; returns a promise so UI can await
	const hit = async (player) => {
		// for dealer or player or AI, reuse the same deal helper
		await dealOneCardTo(player, false, 350)
		const handValue = calculateHand(currentHandsRef.current[player] || [])

		if (player !== "dealer") {
			if (handValue > 21) {
				setGameState((prev) => ({
					...prev,
					isGameOver: true,
					gameOutcome: "Player BUSTS! Dealer WINS!",
				}))
			}
		}
		return handValue
	}

	const calculateHand = (hand = []) => {
		let value = 0
		let aceCount = 0

		// defensive: skip any non-card entries and sentinel objects
		hand.forEach((card) => {
			if (!card || card.isBusted) return
			if (card.card === "A") {
				aceCount += 1
				value += 11
			} else if (typeof card.value === "number") {
				value += card.value
			}
		})

		while (value > 21 && aceCount > 0) {
			value -= 10
			aceCount -= 1
		}

		return value
	}

	return (
		<BlackjackContext.Provider
			value={{
				currentHands,
				gameState,
				deckCount,
				showSetup,
				openSetup,
				closeSetup,
				startGame,
				animationRequest,
				resolveAnimation,
				playerList,
				deal,
				hit,
				calculateHand,
				handleDealerTurn,
				handleAITurn,
				handleCreateDecks,
			}}
		>
			{children}
		</BlackjackContext.Provider>
	)
}
