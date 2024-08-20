import Card from './Card'

const Dealer = ({ dealerHand }) => {
  const displayHand = dealerHand.map((card) => (
    <Card key={card.id} card={card.card} suit={card.suit} />
  ))

  return <div className="flex">{displayHand}</div>
}
export default Dealer
