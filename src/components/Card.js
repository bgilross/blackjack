import React from 'react'
import cards from '../images/cards'

const Card = ({ card, suit }) => {
  const cardKey = `${card}${suit}`

  return (
    <div>
      <img
        src={cards[cardKey]}
        alt={`${card} of ${suit}`}
        style={{ width: '10rem', height: '15rem' }}
      />
    </div>
  )
}

export default Card
