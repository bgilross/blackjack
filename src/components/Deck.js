const Deck = ({
  deckNumber,
  handleDeckNumberChange,
  handleCreateDecks,
  handleDealCards,
}) => {
  return (
    <div>
      <div className="w-100">
        <label htmlFor="deckNumber">Deck Number</label>
        <input
          type="number"
          value={deckNumber}
          onChange={handleDeckNumberChange}
          name="deckNumber"
          id="deckNumber"
        />
        <button onClick={handleCreateDecks}>Create Decks</button>
      </div>
      <button onClick={handleDealCards}>DEAL</button>
    </div>
  )
}
export default Deck
