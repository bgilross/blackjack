import Card from './Card'
import CardBack from '../images/cards/CardBack.png'
const Dealer = ({ dealerHand }) => {
  const displayHand = dealerHand.map((card, index) => {
    console.log(dealerHand)
    console.log(card, index)
    if (index != 1) {
      return <Card key={card.id} card={card.card} suit={card.suit} />
    } else {
      return (
        <img
          key={index}
          src={CardBack}
          alt="card back"
          height="150"
          width="100"
        />
      )
    }
  })

  return <div className="flex">{displayHand}</div>
}
export default Dealer
