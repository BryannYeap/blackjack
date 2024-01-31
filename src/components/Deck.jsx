import Card from "./Card";
import PropTypes from "prop-types";

Deck.propTypes = {
  deckSize: PropTypes.number.isRequired,
};

function Deck({ deckSize }) {
  return (
    <div>
      <h2>Deck</h2>
      <Card isFaceDown={true} />
      <h3>{`No. of cards in deck: ${deckSize}`}</h3>
    </div>
  );
}

export default Deck;
