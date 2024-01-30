import "./Card.css";
import PropTypes from "prop-types";

Card.propTypes = {
  suit: PropTypes.string,
  value: PropTypes.string,
  isFaceDown: PropTypes.bool,
};

function Card({ suit, value, isFaceDown = false }) {
  return (
    <div className={`card ${isFaceDown && "card-back"} ${suit}`}>
      {!isFaceDown && <div className="card-value">{value}</div>}
      {!isFaceDown && <div className="card-suit">{suit}</div>}
    </div>
  );
}

export default Card;
