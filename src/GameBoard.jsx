import Hand from "./components/Hand";
import Button from "./components/Button";
import Deck from "./components/Deck";
import "./GameBoard.css";
import useGameState from "./hooks/useGameState";

function GameBoard() {
  const {
    isRoundStarted,
    isDisabled,
    isDealersTurn,
    dealerPoints,
    playerPoints,
    dealerCards,
    playerCards,
    dealerhandValue,
    playerHandValue,
    handleStartRound,
    handlePlayerHit,
    handleDealersTurn,
  } = useGameState();

  return (
    <div className="game-container">
      <Deck />
      <div className="hands">
        <div>
          <h2>{`Dealer's Hand: ${isDealersTurn ? dealerhandValue : "🙊"}`}</h2>
          <Hand cards={dealerCards} />
        </div>
        <div>
          <h2>{`Your Hand: ${playerHandValue}`}</h2>
          <Hand cards={playerCards} />
        </div>
        <div className="player-buttons">
          {isRoundStarted ? (
            <>
              <Button
                text="Hit"
                onClick={handlePlayerHit}
                isDisabled={isDisabled}
              />
              <Button
                text="Stay"
                onClick={handleDealersTurn}
                isDisabled={isDisabled}
              />
            </>
          ) : (
            <Button text="Deal" onClick={handleStartRound} />
          )}
        </div>
      </div>
      <div className="scoreboard">
        <h2>Scoreboard</h2>
        <h3>Dealer: {dealerPoints}</h3>
        <h3>You: {playerPoints}</h3>
      </div>
    </div>
  );
}

export default GameBoard;
