import uniqid from "uniqid"

let deck = []

export const createDecks = (num) => {
	deck = []
	for (let i = 0; i < num; i++) {
		const d = createDeck()
		deck.push(...d)
	}
	shuffleDeck()
	// small log for debugging
	console.log(
		`create decks (${num}) and shuffle done: deck size=${deck.length}`
	)
}

const createDeck = () => {
	const suits = ["H", "S", "D", "C"]
	let newDeck = suits.flatMap((suit) =>
		Array.from({ length: 13 }, (_, i) => {
			let number = i + 1
			let card
			if (number === 1) {
				card = "A"
			} else if (number === 11) {
				card = "J"
			} else if (number === 12) {
				card = "Q"
			} else if (number === 13) {
				card = "K"
			} else {
				card = number.toString()
			}

			let value
			if (number < 11) {
				value = number
			} else {
				value = 10
			}

			return {
				id: uniqid(),
				card: card,
				suit: suit,
				value: value,
			}
		})
	)
	console.log("create deck done, new deck = ", newDeck)
	return newDeck
}

export const getCard = () => {
	// draw from top
	const card = deck.shift()
	return card
}

export const getDeckSize = () => deck.length

const shuffleDeck = () => {
	// Fisher-Yates shuffle
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		const temp = deck[i]
		deck[i] = deck[j]
		deck[j] = temp
	}
}
