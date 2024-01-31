import Hand from "./components/Hand";
import Button from "./components/Button";
import Deck from "./components/Deck";
import "./GameBoard.css";
import useGameState from "./hooks/useGameState";
import Scoreboard from "./Scoreboard";

function GameBoard() {
  const {
    isRoundStarted,
    isDisabled,
    isDealersTurn,
    dealerPoints,
    playerPoints,
    dealerCards,
    playerCards,
    deck,
    dealerhandValue,
    playerHandValue,
    handleStartRound,
    handlePlayerHit,
    handleDealersTurn,
  } = useGameState();

  return (
    <div className="game-container">
      <Deck deckSize={deck.length} />
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
      <Scoreboard dealerPoints={dealerPoints} playerPoints={playerPoints} />
    </div>
  );
}

export default GameBoard;
