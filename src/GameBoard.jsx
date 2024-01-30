import Hand from "./components/Hand";
import Button from "./components/Button";
import Deck from "./components/Deck";
import "./GameBoard.css";
import useGameState from "./hooks/useGameState";
import { useEffect, useState } from "react";
import { VALUES } from "./utils/constants";

function GameBoard() {
  const [playerHandValue, setPlayerHandValue] = useState(0);
  const [dealerhandValue, setDealerhandValue] = useState(0);

  const {
    isRoundStarted,
    isDisabled,
    dealerPoints,
    playerPoints,
    dealerCards,
    playerCards,
    handleStartRound,
    handlePlayerHit,
    handleDealerHit,
  } = useGameState();

  const calculateHandValue = (cards) => {
    let handValue = 0;
    let hasAce = false;

    cards.forEach((card) => {
      const { value } = card;

      switch (value) {
        case VALUES.JACK:
        case VALUES.QUEEN:
        case VALUES.KING:
          handValue += 10;
          break;
        case "A":
          hasAce = true;
          handValue += 11;
          break;
        default:
          handValue += parseInt(value, 10);
          break;
      }
    });

    if (hasAce && handValue > 21) {
      handValue -= 10;
    }

    return handValue;
  };

  useEffect(() => {
    setPlayerHandValue(calculateHandValue(playerCards));
    setDealerhandValue(calculateHandValue(dealerCards));
  }, [playerCards, dealerCards]);

  return (
    <div className="game-container">
      <Deck />
      <div className="hands">
        <div>
          <h2>{`Dealer's Hand: ${dealerhandValue}`}</h2>
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
                onClick={handleDealerHit}
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
        <h3>{dealerPoints}</h3>
        <h3>{playerPoints}</h3>
      </div>
    </div>
  );
}

export default GameBoard;
