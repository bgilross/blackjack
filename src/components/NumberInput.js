const NumberInput = ({ label, value, onChange }) => {
  return (
    <div>
      {label && <label htmlFor="deckNumber">{label}</label>}
      <input
        type="number"
        className="input-reset ba b--black-20 pa2 mb2 w-10 tc"
        style={{ width: '3rem' }} // Adjust the width as needed
        maxLength="2" // This controls the maximum number of digits
        min="0" // Set minimum value
        max="99" // Set maximum value
        value={value}
        onChange={onChange}
        name="deckNumber"
        id="deckNumber"
      />
    </div>
  )
}
export default NumberInput
