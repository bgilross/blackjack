import Card from './Card'

const Player = ({ playerHand }) => {
  const displayHand = playerHand.map((card) => (
    <Card key={card.id} card={card.card} suit={card.suit} />
  ))

  return <div className="flex">{displayHand}</div>
}
export default Player
