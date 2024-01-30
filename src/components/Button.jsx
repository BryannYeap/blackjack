import "./Button.css";
import PropTypes from "prop-types";

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

function Button({ text, onClick, isDisabled }) {
  return (
    <button className="button" onClick={onClick} disabled={isDisabled}>
      {text}
    </button>
  );
}

export default Button;
