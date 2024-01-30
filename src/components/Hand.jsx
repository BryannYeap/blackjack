import Card from "./Card";
import "./Hand.css";
import PropTypes from "prop-types";

Hand.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape(Card.propTypes)).isRequired,
};

function Hand({ cards }) {
  return (
    <div className="cards-container">
      {cards.map((card, index) => (
        <Card
          key={index}
          suit={card.suit}
          value={card.value}
          isFaceDown={card.isFaceDown}
        />
      ))}
    </div>
  );
}

export default Hand;
