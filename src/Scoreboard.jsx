import "./Scoreboard.css";
import PropTypes from "prop-types";

Scoreboard.propTypes = {
  dealerPoints: PropTypes.number.isRequired,
  playerPoints: PropTypes.number.isRequired,
};

function Scoreboard({ dealerPoints, playerPoints }) {
  return (
    <div className="scoreboard-container">
      <table className="scoreboard-table">
        <thead>
          <tr>
            <th></th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dealer</td>
            <td>{dealerPoints}</td>
          </tr>
          <tr>
            <td>You</td>
            <td>{playerPoints}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Scoreboard;
