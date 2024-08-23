import React from 'react'
import cards from '../images/cards'

const Card = ({ card, suit }) => {
  const cardKey = `${card}${suit}`

  return (
    <img
      src={cards[cardKey]}
      alt={`${card} of ${suit}`}
      style={{ width: '100px', height: '150px' }}
    />
  )
}

export default Card
