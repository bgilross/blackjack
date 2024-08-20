import React from 'react'
import cards from '../images/cards' // Import the cards object

const Card = ({ card, suit }) => {
  // Construct the key used to access the correct image
  const cardKey = `${card}${suit}` // e.g., '2C' for 2 of Clubs, 'AS' for Ace of Spades

  return (
    <img
      src={cards[cardKey]}
      alt={`${card} of ${suit}`}
      style={{ width: '100px', height: '150px' }} // Customize the size as needed
    />
  )
}

export default Card
